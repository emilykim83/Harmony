const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LessonsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const lessons = await db.lessons.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await lessons.setSections(data.sections || [], {
      transaction,
    });

    return lessons;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const lessonsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const lessons = await db.lessons.bulkCreate(lessonsData, { transaction });

    // For each item created, replace relation files

    return lessons;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const lessons = await db.lessons.findByPk(id, {}, { transaction });

    await lessons.update(
      {
        title: data.title || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await lessons.setSections(data.sections || [], {
      transaction,
    });

    return lessons;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const lessons = await db.lessons.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of lessons) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of lessons) {
        await record.destroy({ transaction });
      }
    });

    return lessons;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const lessons = await db.lessons.findByPk(id, options);

    await lessons.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await lessons.destroy({
      transaction,
    });

    return lessons;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const lessons = await db.lessons.findOne({ where }, { transaction });

    if (!lessons) {
      return lessons;
    }

    const output = lessons.get({ plain: true });

    output.sections_lesson = await lessons.getSections_lesson({
      transaction,
    });

    output.sections = await lessons.getSections({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.sections,
        as: 'sections',
        through: filter.sections
          ? {
              where: {
                [Op.or]: filter.sections.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.sections ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('lessons', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('lessons', 'description', filter.description),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.lessons.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.lessons.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('lessons', 'title', query),
        ],
      };
    }

    const records = await db.lessons.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
