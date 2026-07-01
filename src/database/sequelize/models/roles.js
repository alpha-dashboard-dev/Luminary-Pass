const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          role_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

            business_code: {
                type: DataTypes.STRING(8),
                allowNull: true,
                validate: {
                    is: /^[A-Za-z0-9]{8}$/,
                },
            },

          role: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },

          rank: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
          },

          description: {
            type: DataTypes.TEXT,
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
          modelName: "Role",
          tableName: "roles",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Role;
  }

    static associate(models) {

        // Business -> Roles
        Role.belongsTo(models.Business, {
            foreignKey: "business_code",
            targetKey: "business_code",
            as: "business",
            constraints: false,
        });

        // Role -> Users
        Role.hasMany(models.User, {
            foreignKey: "role_code",
            sourceKey: "role_code",
            as: "users",
            constraints: false,
        });

        // Role -> RolePermission
        Role.hasMany(models.RolePermissions, {
            foreignKey: "role_code",
            sourceKey: "role_code",
            as: "rolePermissions",
            constraints: false,
        });

        // Role <-> Permission
        Role.belongsToMany(models.Permission, {
            through: models.RolePermissions,
            foreignKey: "role_code",
            otherKey: "permission_code",
            sourceKey: "role_code",
            targetKey: "permission_code",
            as: "permissions",
            constraints: false,
        });

    }
}

module.exports = Role;