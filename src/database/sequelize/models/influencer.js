const { Model, DataTypes } = require("sequelize");

class Influencer extends Model {
  static initModel(sequelize) {
    Influencer.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          influencer_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          user_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          bio: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          gender: {
            type: DataTypes.ENUM("male", "female", "other"),
            allowNull: true,
          },

          date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          description: {
              type: DataTypes.TEXT,
              allowNull: true,
          },

          user_name:  {
              type: DataTypes.STRING(100),
              allowNull: true,
          },
          account_type:{
              type: DataTypes.STRING(100),
              allowNull: true,
          },
          follower_count: {
              type: DataTypes.INTEGER,
              allowNull: true,
          },
           media_count: {
              type: DataTypes.INTEGER,
               allowNull: true,
           },
          min_followers: {
              type: DataTypes.INTEGER,
              allowNull: true,
          },
          max_followers: {
              type: DataTypes.INTEGER,
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
          modelName: "Influencer",
          tableName: "influencers",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Influencer;
  }

  static associate(models) {
    Influencer.belongsTo(models.User, {
        foreignKey: "user_code",
        targetKey: "user_code",
        as: "user",
    });

    Influencer.hasMany(models.InfluencerRating, {
        foreignKey: "influencer_code",
        sourceKey: "influencer_code",
        as: "influencer",
        constraints: false,
    })

    Influencer.hasMany(models.EventInvitation, {
        foreignKey: "influencer_code",
        sourceKey: "influencer_code",
        as: "influencerInvitation",
        constraints: false,
    })

    Influencer.hasMany(models.EventParticipant, {
        foreignKey: "influencer_code",
        sourceKey: "influencer_code",
        as: "influencerParticipant",
        constraints: false,
    })
  }
}

module.exports = Influencer;