const { Model, DataTypes } = require("sequelize");

class Business extends Model {
  static initModel(sequelize) {
    Business.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          business_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },
            organization_code: {
                type: DataTypes.STRING(8),
                allowNull: true,
                validate: {
                    is: /^[A-Za-z0-9]{8}$/,
                },
            },


          owner_user_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },

          email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
              isEmail: true,
            },
          },

          phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
          },

          timezone: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          status: {
            type: DataTypes.ENUM(
                "lead",
                "qualified",
                "demo_scheduled",
                "active",
                "inactive",
                "rejected"
            ),
            allowNull: false,
            defaultValue: "lead",
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
          modelName: "Business",
          tableName: "businesses",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Business;
  }

  static associate(models) {
      Business.belongsTo(models.Organization, {
          foreignKey: "organization_code",
          targetKey: "organization_code",
          as: "organization",
      });
    Business.belongsTo(models.User, {
        foreignKey: "owner_user_code",
        targetKey: "user_code",
        as: "owner",
    });

      Business.hasMany(models.Role, {
          foreignKey: "business_code",
          sourceKey: "business_code",
          as: "roles",
          constraints: false,
      });

        Business.hasMany(models.User, {
            foreignKey: "business_code",
            sourceKey: "business_code",
            as: "users",
            constraints: false
        });
        Business.hasMany(models.Venue, {
            foreignKey: "business_code",
            sourceKey: "business_code",
            as: "venue",
            constraints: false
        })
  }
}

module.exports = Business;