const { Model, DataTypes } = require("sequelize");

class Settings extends Model {
  static initModel(sequelize) {
    Settings.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          setting_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          entity_type: {
            type: DataTypes.ENUM('system', 'business', 'user'),
            allowNull: false,
          },

          entity_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          setting_key: {
            type: DataTypes.STRING(100),
            allowNull: false
          },

          setting_value: {
            type: DataTypes.STRING(100),
            allowNull: false
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
          modelName: "Settings",
          tableName: "settings",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Settings;
  }

  static associate(models) {
  }
}

module.exports = Settings;