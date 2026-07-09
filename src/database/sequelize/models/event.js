const { Model, DataTypes } = require("sequelize");

class Event extends Model {
  static initModel(sequelize) {
    Event.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          event_code: {
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

          venue_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          title: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },

          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          start_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          end_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
          },

          application_deadline: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          influencer_capacity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
          },

          dress_code: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          special_instructions: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          visibility: {
            type: DataTypes.ENUM("public", "private"),
            defaultValue: "public",
          },

          created_by: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          status: {
            type: DataTypes.ENUM(
                "draft",
                "published",
                "closed",
                "live",
                "completed",
                "cancelled"
            ),
            defaultValue: "draft",
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
          modelName: "Event",
          tableName: "events",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Event;
  }

  static associate(models) {
    Event.belongsTo(models.Business, {
        foreignKey: "business_code",
        targetKey: "business_code",
        as: "business",
        constraints: false
    });

    Event.belongsTo(models.Venue, {
        foreignKey: "venue_code",
        targetKey: "venue_code",
        as: "venue",
        constraints: false
    });

    Event.belongsTo(models.User, {
        foreignKey: "created_by",
        targetKey: "user_code",
        as: "creator",
        constraints: false
    });

    Event.hasMany(models.InfluencerRating, {
        foreignKey: "event_code",
        sourceKey: "event_code",
        as: "event",
        constraints: false
    })
      Event.hasMany(models.EventInvitation, {
          foreignKey: "event_code",
          sourceKey: "event_code",
          as: "eventInvitation",
          constraints: false
      })

      Event.hasMany(models.EventParticipant, {
          foreignKey: "event_code",
          sourceKey: "event_code",
          as: "eventParticipant",
          constraints: false
      })

      Event.hasMany(models.Location, {
          foreignKey: "entity_code",
          sourceKey: "event_code",
          as: "location",
          constraints: false
      })
  }
}

module.exports = Event;