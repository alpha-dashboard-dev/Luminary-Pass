const { Model, DataTypes } = require("sequelize");

class Badge extends Model {
  static initModel(sequelize) {
    Badge.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          entity_badge_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          entity_type: {
            type: DataTypes.ENUM(
                "influencer",
                "business",
                "venue",
                "event"
            ),
            allowNull: false,
          },

          entity_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          badge_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },

          badge_description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          badge_icon: {
            type: DataTypes.STRING(500),
            allowNull: true,
          },

          badge_type: {
            type: DataTypes.ENUM(
                "attendance",
                "engagement",
                "performance",
                "milestone",
                "special"
            ),
            allowNull: false,
          },

          badge_level: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
          },

          score: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
          },

          awarded_by: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          awarded_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },

          expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          status: {
            type: DataTypes.ENUM(
                "active",
                "expired",
                "revoked"
            ),
            defaultValue: "active",
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
          modelName: "Badge",
          tableName: "badges",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Badge;
  }

  static associate(models) {
    // Polymorphic table - associations handled manually
  }
}

module.exports = Badge;