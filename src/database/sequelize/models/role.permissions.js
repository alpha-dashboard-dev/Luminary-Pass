const { Model, DataTypes } = require("sequelize");

class RolePermissions extends Model {
  static initModel(sequelize) {
    RolePermissions.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          role_permission_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          role_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          permission_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
        },
        {
          sequelize,
          modelName: "RolePermissions",
          tableName: "role_permissions",
          timestamps: false,
          underscored: true,
        }
    );

    return RolePermissions;
  }

  static associate(models) {
    RolePermissions.belongsTo(models.Role, {
        foreignKey: "role_code",
        targetKey: "role_code",
        as: "role",
        constraints: false
    });

    RolePermissions.belongsTo(models.Permission, {
        foreignKey: "permission_code",
        targetKey: "permission_code",
        as: "permission",
        constraints: false
    });
  }
}

module.exports = RolePermissions;