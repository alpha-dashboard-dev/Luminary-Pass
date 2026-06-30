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
    // Role.belongsTo(models.Business, {
    //     foreignKey: "business_code",
    //     targetKey: "business_code",
    //     as: "business",
    // });
    //
    // Role.hasMany(models.User, {
    //     foreignKey: "role_code",
    //     sourceKey: "role_code",
    //     as: "users",
    // });
  }
}

module.exports = Role;