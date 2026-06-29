const { Model, DataTypes } = require("sequelize");

class EventChecklist extends Model {
  static initModel(sequelize) {
    EventChecklist.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          checklist_code: {
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

          title: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },

          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          checklist_type: {
            type: DataTypes.ENUM(
                "story",
                "reel",
                "post",
                "video",
                "venue_tag",
                "location_tag",
                "custom"
            ),
            allowNull: false,
          },

          points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
          },

          submission_deadline: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          is_required: {
            type: DataTypes.ENUM("yes", "no"),
            defaultValue: "yes",
          },

          display_order: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
          },

          status: {
            type: DataTypes.ENUM("active", "inactive"),
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
          modelName: "EventChecklist",
          tableName: "event_checklists",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return EventChecklist;
  }

  static associate(models) {
    // EventChecklist.belongsTo(models.Event, {
    //     foreignKey: "event_code",
    //     targetKey: "event_code",
    //     as: "event",
    // });
  }
}

module.exports = EventChecklist;