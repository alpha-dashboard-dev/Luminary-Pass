const { Model, DataTypes } = require("sequelize");

class SocialLogin extends Model {
  static initModel(sequelize) {
    SocialLogin.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          social_login_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          user_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          provider: {
            type: DataTypes.ENUM(
                "google",
                "facebook",
                "instagram",
                "apple"
            ),
            allowNull: false,
          },

          provider_user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },

          access_token: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true,
          },

          token_expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },

          last_login_at: {
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
          modelName: "SocialLogin",
          tableName: "social_logins",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return SocialLogin;
  }

  static associate(models) {
    // SocialLogin.belongsTo(models.User, {
    //     foreignKey: "user_code",
    //     targetKey: "user_code",
    //     as: "user",
    // });
  }
}

module.exports = SocialLogin;