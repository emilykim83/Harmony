const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProgressDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const progress = await db.progress.create(
      {
        id: data.id || undefined,

        completed: data.completed || false,

        completed_at: data.completed_at || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await progress.setUser(data.user || null, {
      transaction,
    });

    await progress.setSection(data.section || null, {
      transaction,
    });

    return progress;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const progressData = data.map((item, index) => ({
      id: item.id || undefined,

      completed: item.completed || false,

      completed_at: item.completed_at || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const progress = await db.progress.bulkCreate(progressData, {
      transaction,
    });

    // For each item created, replace relation files

    return progress;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const progress = await db.progress.findByPk(id, {}, { transaction });

    await progress.update(
      {
        completed: data.completed || false,

        completed_at: data.completed_at || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await progress.setUser(data.user || null, {
      transaction,
    });

    await progress.setSection(data.section || null, {
      transaction,
    });

    return progress;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const progress = await db.progress.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of progress) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of progress) {
        await record.destroy({ transaction });
      }
    });

    return progress;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const progress = await db.progress.findByPk(id, options);

    await progress.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await progress.destroy({
      transaction,
    });

    return progress;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const progress = await db.progress.findOne({ where }, { transaction });

    if (!progress) {
      return progress;
    }

    const output = progress.get({ plain: true });

    output.user = await progress.getUser({
      transaction,
    });

    output.section = await progress.getSection({
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
        model: db.users,
        as: 'user',
      },

      {
        model: db.sections,
        as: 'section',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.completed_atRange) {
        const [start, end] = filter.completed_atRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            completed_at: {
              ...where.completed_at,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            completed_at: {
              ...where.completed_at,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.completed) {
        where = {
          ...where,
          completed: filter.completed,
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.section) {
        const listItems = filter.section.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          sectionId: { [Op.or]: listItems },
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
          count: await db.progress.count({
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
      : await db.progress.findAndCountAll({
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
          Utils.ilike('progress', 'completed', query),
        ],
      };
    }

    const records = await db.progress.findAll({
      attributes: ['id', 'completed'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['completed', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.completed,
    }));
  }
};
