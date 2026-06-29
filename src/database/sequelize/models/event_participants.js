const { Model, DataTypes } = require("sequelize");

class EventParticipant extends Model {
  static initModel(sequelize) {
    EventParticipant.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          participant_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          event_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          influencer_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          source: {
            type: DataTypes.ENUM("application", "invitation"),
            allowNull: false,
          },

          source_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
          },

          status: {
            type: DataTypes.ENUM(
                "approved",
                "checked_in",
                "completed",
                "no_show"
            ),
            defaultValue: "approved",
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
          modelName: "EventParticipant",
          tableName: "event_participants",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return EventParticipant;
  }

  static associate(models) {
    EventParticipant.belongsTo(models.Event, {
        foreignKey: "event_code",
        targetKey: "event_code",
        as: "event",
    });

    EventParticipant.belongsTo(models.Influencer, {
        foreignKey: "influencer_code",
        targetKey: "influencer_code",
        as: "influencer",
    });
  }
}

module.exports = EventParticipant;