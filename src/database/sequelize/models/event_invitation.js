const { Model, DataTypes } = require("sequelize");

class EventInvitation extends Model {
  static initModel(sequelize) {
    EventInvitation.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          invitation_code: {
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
          },

          entity_type: {
            type: DataTypes.ENUM("influencer", "customer", "business"),
            allowNull: true,
          },

          entity_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
          },

          // influencer_code: {
          //   type: DataTypes.STRING(8),
          //   allowNull: false,
          // },

          invited_by: {
            type: DataTypes.STRING(8),
            allowNull: false,
          },

          invitation_message: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          status: {
            type: DataTypes.ENUM(
                "pending",
                "accepted",
                "declined",
                "expired"
            ),
            defaultValue: "pending",
          },

          responded_at: {
            type: DataTypes.DATE,
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
          modelName: "EventInvitation",
          tableName: "event_invitations",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return EventInvitation;
  }

  static associate(models) {
    EventInvitation.belongsTo(models.Event, {
        foreignKey: "event_code",
        targetKey: "event_code",
        as: "eventInvitation",
        constraints: false,
    });

    // EventInvitation.belongsTo(models.Influencer, {
    //     foreignKey: "user_code",
    //     targetKey: "user_code",
    //     as: "influencerInvitation",
    //     constraints: false,
    // });

    EventInvitation.belongsTo(models.User, {
        foreignKey: "invited_by",
        targetKey: "user_code",
        as: "inviter",
        constraints: false
    });
  }
}

module.exports = EventInvitation;