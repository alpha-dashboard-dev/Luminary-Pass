const { Model, DataTypes } = require("sequelize");

class Location extends Model {
  static initModel(sequelize) {
    Location.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          location_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          entity_type: {
            type: DataTypes.ENUM("business", "event", "user"),
            allowNull: true,
          },

          entity_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          address_line_1: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          address_line_2: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          city: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          state: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          country: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          postal_code: {
            type: DataTypes.STRING(50),
            allowNull: true,
          },
          status: {
              type: DataTypes.BOOLEAN,
              defaultValue: false,
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
          modelName: "Location",
          tableName: "locations",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
          indexes: [
            {
              fields: ["entity_type", "entity_code"],
            },
          ],
        }
    );

    return Location;
  }

  static associate(models) {
    // Polymorphic relation (handled in service layer)
    Location.belongsTo(models.Business, {
        foreignKey: "entity_code",
        targetKey: "business_code",
        as: "business",
        constraints: false
    })
      Location.belongsTo(models.User, {
          foreignKey: "entity_code",
          targetKey: "user_code",
          as: "user",
          constraints: false
      })

    Location.belongsTo(models.Event, {
        foreignKey: "entity_code",
        targetKey: "event_code",
        as: "event",
        constraints: false
    })
  }
}

module.exports = Location;