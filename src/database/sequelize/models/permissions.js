const { Model, DataTypes } = require("sequelize");

class Permission extends Model {
  static initModel(sequelize) {
    Permission.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          permission_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          module: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          name: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },

          updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
        },
        {
          sequelize,
          modelName: "Permission",
          tableName: "permissions",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Permission;
  }

  static associate(models) {
    // Many-to-Many (recommended RBAC design)
    // Permission.belongsToMany(models.Role, {
    //     through: models.RolePermission,
    //     foreignKey: "permission_code",
    //     otherKey: "role_code",
    //     as: "roles",
    // });
    //
    //   Permission.hasMany(models.RolePermission, {
    //       foreignKey: "permission_code",
    //       sourceKey: "permission_code",
    //       as: "rolePermissions",
    //       constraints: false
    //   });
  }
}

module.exports = Permission;