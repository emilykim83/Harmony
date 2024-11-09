const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const lessons = sequelize.define(
    'lessons',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  lessons.associate = (db) => {
    db.lessons.belongsToMany(db.sections, {
      as: 'sections',
      foreignKey: {
        name: 'lessons_sectionsId',
      },
      constraints: false,
      through: 'lessonsSectionsSections',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.lessons.hasMany(db.sections, {
      as: 'sections_lesson',
      foreignKey: {
        name: 'lessonId',
      },
      constraints: false,
    });

    //end loop

    db.lessons.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.lessons.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return lessons;
};
