const { Model, DataTypes } = require("sequelize");

class Venue extends Model {
  static initModel(sequelize) {
    Venue.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          venue_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          business_code: {
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

          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          status: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
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
          modelName: "Venue",
          tableName: "venues",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Venue;
  }

  static associate(models) {
    Venue.belongsTo(models.Business, {
        foreignKey: "business_code",
        targetKey: "business_code",
        as: "business",
    });

    Venue.hasMany(models.Location, {
        foreignKey: "venue_code",
        sourceKey: "venue_code",
        as: "locations",
    });
  }
}

module.exports = Venue;