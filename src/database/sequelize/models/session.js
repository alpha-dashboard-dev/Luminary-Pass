const { Model, DataTypes } = require("sequelize");

class UserSession extends Model {
  static initModel(sequelize) {
    UserSession.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          session_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          user_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          ip_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          user_agent: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          device_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          device_type: {
            type: DataTypes.ENUM("desktop", "mobile", "tablet", "other"),
            allowNull: false,
            defaultValue: "desktop",
          },

          timezone: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          fcm_token: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          status: {
            type: DataTypes.ENUM("active", "expired", "revoked"),
            allowNull: false,
            defaultValue: "active",
          },

          expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          last_activity_at: {
            type: DataTypes.DATE,
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
          modelName: "UserSession",
          tableName: "user_sessions",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return UserSession;
  }

  static associate(models) {
    UserSession.belongsTo(models.User, {
        foreignKey: "user_code",
        targetKey: "user_code",
        as: "user",
        constraints: false
    });
  }
}

module.exports = UserSession;