const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const progress = sequelize.define(
    'progress',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      completed: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      completed_at: {
        type: DataTypes.DATE,
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

  progress.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.progress.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.progress.belongsTo(db.sections, {
      as: 'section',
      foreignKey: {
        name: 'sectionId',
      },
      constraints: false,
    });

    db.progress.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.progress.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return progress;
};
