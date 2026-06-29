const { Model, DataTypes } = require("sequelize");

class VenueLocation extends Model {
  static initModel(sequelize) {
    VenueLocation.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          venue_location_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          venue_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          address: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          area: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          city: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          country: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
          modelName: "VenueLocation",
          tableName: "venue_locations",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return VenueLocation;
  }

  static associate(models) {
    VenueLocation.belongsTo(models.Venue, {
        foreignKey: "venue_code",
        targetKey: "venue_code",
        as: "venue",
        constraints: false
    });
  }
}

module.exports = VenueLocation;