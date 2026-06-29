const { Model, DataTypes } = require("sequelize");

class RolePermission extends Model {
  static initModel(sequelize) {
    RolePermission.init(
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
          modelName: "RolePermission",
          tableName: "role_permissions",
          timestamps: false,
          underscored: true,
        }
    );

    return RolePermission;
  }

  static associate(models) {
    // RolePermission.belongsTo(models.Role, {
    //     foreignKey: "role_code",
    //     targetKey: "role_code",
    //     as: "role",
    // });

    // RolePermission.belongsTo(models.Permission, {
    //     foreignKey: "permission_code",
    //     targetKey: "permission_code",
    //     as: "permission",
    // });
  }
}

module.exports = RolePermission;