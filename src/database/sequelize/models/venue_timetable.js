const { Model, DataTypes } = require("sequelize");

class VenueTimeTable extends Model {
  static initModel(sequelize) {
    VenueTimeTable.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          venue_schedule_code: {
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

          working_day: {
            type: DataTypes.ENUM(
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
            ),
            allowNull: false,
          },

          start_time: {
            type: DataTypes.TIME,
            allowNull: false,
          },

          end_time: {
            type: DataTypes.TIME,
            allowNull: false,
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
          modelName: "VenueTimeTable",
          tableName: "venue_time_table",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return VenueTimeTable;
  }

  static associate(models) {
    VenueTimeTable.belongsTo(models.Venue, {
        foreignKey: "venue_code",
        targetKey: "venue_code",
        as: "venue",
    });
  }
}

module.exports = VenueTimeTable;