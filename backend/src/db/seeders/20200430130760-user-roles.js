const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('music_coordinator'),
        name: 'music_coordinator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('music_teacher'),
        name: 'music_teacher',
        createdAt,
        updatedAt,
      },

      { id: getId('parent'), name: 'parent', createdAt, updatedAt },

      { id: getId('student'), name: 'student', createdAt, updatedAt },

      { id: getId('guest'), name: 'guest', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'lessons',
      'progress',
      'sections',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('student'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('CREATE_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('READ_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('UPDATE_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('DELETE_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('CREATE_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('READ_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('UPDATE_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('student'),
        permissionId: getId('READ_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guest'),
        permissionId: getId('READ_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('CREATE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('READ_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('UPDATE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('DELETE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('CREATE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('READ_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('UPDATE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('student'),
        permissionId: getId('READ_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('student'),
        permissionId: getId('UPDATE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('CREATE_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('READ_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('UPDATE_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('DELETE_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('CREATE_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('READ_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('UPDATE_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('READ_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('student'),
        permissionId: getId('READ_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guest'),
        permissionId: getId('READ_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_coordinator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('music_teacher'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('parent'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('student'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guest'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_LESSONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_LESSONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_LESSONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_LESSONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PROGRESS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PROGRESS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PROGRESS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PROGRESS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SECTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SECTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'music_coordinator',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'music_teacher',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
