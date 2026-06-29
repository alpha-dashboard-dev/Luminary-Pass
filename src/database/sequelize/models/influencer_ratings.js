const { Model, DataTypes } = require("sequelize");

class InfluencerRating extends Model {
  static initModel(sequelize) {
    InfluencerRating.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          rating_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
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

          event_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          rated_by: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          rating_source: {
            type: DataTypes.ENUM("event", "social"),
            allowNull: false,
          },

          rating_type: {
            type: DataTypes.ENUM(
                "attendance",
                "content_quality",
                "professionalism",
                "engagement",
                "communication",
                "overall"
            ),
            allowNull: false,
          },

          rating: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
          },

          comments: {
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
          modelName: "InfluencerRating",
          tableName: "influencer_ratings",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return InfluencerRating;
  }

  static associate(models) {
    // InfluencerRating.belongsTo(models.Influencer, {
    //     foreignKey: "influencer_code",
    //     targetKey: "influencer_code",
    //     as: "influencer",
    //     constraints: false
    // });
    //
    // // InfluencerRating.belongsTo(models.Event, {
    // //     foreignKey: "event_code",
    // //     targetKey: "event_code",
    // //     as: "event",
    // // });
    //
    // InfluencerRating.belongsTo(models.User, {
    //     foreignKey: "rated_by",
    //     targetKey: "user_code",
    //     as: "rater",
    //     constraints: false
    // });
  }
}

module.exports = InfluencerRating;