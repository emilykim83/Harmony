const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const sections = sequelize.define(
    'sections',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  sections.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.sections.hasMany(db.progress, {
      as: 'progress_section',
      foreignKey: {
        name: 'sectionId',
      },
      constraints: false,
    });

    //end loop

    db.sections.belongsTo(db.lessons, {
      as: 'lesson',
      foreignKey: {
        name: 'lessonId',
      },
      constraints: false,
    });

    db.sections.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.sections.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return sections;
};
