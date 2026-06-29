const { Model, DataTypes } = require("sequelize");

class EventParticipantChecklist extends Model {
  static initModel(sequelize) {
    EventParticipantChecklist.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          participant_checklist_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          participant_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          checklist_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          submission_url: {
            type: DataTypes.STRING(500),
            allowNull: true,
          },

          submission_type: {
            type: DataTypes.ENUM(
                "image",
                "video",
                "link"
            ),
            allowNull: true,
          },

          submitted_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          review_status: {
            type: DataTypes.ENUM(
                "pending",
                "approved",
                "rejected",
                "revision_requested"
            ),
            defaultValue: "pending",
          },

          reviewed_by: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          reviewed_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          review_notes: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          completion_status: {
            type: DataTypes.ENUM(
                "pending",
                "submitted",
                "completed"
            ),
            defaultValue: "pending",
          },

          points_awarded: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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
          modelName: "EventParticipantChecklist",
          tableName: "event_participants_checklists",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return EventParticipantChecklist;
  }

  static associate(models) {
    // EventParticipantChecklist.belongsTo(models.EventParticipant, {
    //     foreignKey: "participant_code",
    //     targetKey: "participant_code",
    //     as: "participant",
    // });

    // EventParticipantChecklist.belongsTo(models.EventChecklist, {
    //     foreignKey: "checklist_code",
    //     targetKey: "checklist_code",
    //     as: "checklist",
    // });

    // EventParticipantChecklist.belongsTo(models.User, {
    //     foreignKey: "reviewed_by",
    //     targetKey: "user_code",
    //     as: "reviewer",
    // });
  }
}

module.exports = EventParticipantChecklist;