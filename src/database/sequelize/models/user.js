const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          user_code: {
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

          business_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
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

          first_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          last_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            validate: {
              isEmail: true,
            },
          },

          phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
          },

          password: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          user_type: {
            type: DataTypes.ENUM("manager", "staff"),
            allowNull: true,
          },

          avatar: {
            type: DataTypes.STRING(500),
            allowNull: true,
          },

          status: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "active",
          },

          profile_setup_token: {
              type: DataTypes.STRING(255),
              allowNull: true,
          },
          profile_setup_token_expires_at: {
              type: DataTypes.DATE,
              allowNull: true,
          },
          profile_completed: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false,
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },

          updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        },
        {
          sequelize,
          modelName: "User",
          tableName: "users",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return User;
  }

  static associate(models) {
      User.belongsTo(models.Role, {
          foreignKey: "role_code",
          targetKey: "role_code",
          as: "role",
          constraints: false,
      });

      User.belongsTo(models.Business, {
          foreignKey: "business_code",
          targetKey: "business_code",
          as: "business",
          constraints: false,
      });
      User.belongsTo(models.Organization, {
          foreignKey: "organization_code",
          targetKey: "organization_code",
          as: "organization",
          constraints: false,
      });
      User.hasMany(models.Influencer, {
          foreignKey: "user_code",
          sourceKey: "user_code",
          as: "influencer",
          constraints: false,
      })
      User.hasMany(models.Event, {
          foreignKey: "created_by",
          sourceKey: "user_code",
          as: "creator",
          constraints: false,
      })
      User.hasMany(models.InfluencerRating, {
          foreignKey: "rated_by",
          sourceKey: "user_code",
          as: "rater",
          constraints: false,
      })

      User.hasMany(models.EventInvitation, {
          foreignKey: "invited_by",
          sourceKey: "user_code",
          as: "inviter",
          constraints: false,
      })

      User.hasMany(models.UserAbility, {
          foreignKey: "user_code",
          sourceKey: "user_code",
          as: "ability",
          constraints: false,
      })

      User.hasMany(models.UserAbility, {
          foreignKey: "added_by",
          sourceKey: "user_code",
          as: "addedBy",
          constraints: false,
      })

      User.hasMany(models.UserAbility, {
          foreignKey: "updated_by",
          sourceKey: "user_code",
          as: "updatedBy",
          constraints: false,
      })
      User.hasMany(models.Location, {
          foreignKey: "entity_code",
          sourceKey: "user_code",
          as: "location",
          constraints: false,
      })
  }
}

module.exports = User;