const { Model, DataTypes } = require("sequelize");

class SocialMedia extends Model {
    static initModel(sequelize) {
        SocialMedia.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },

                social_media_code: {
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

                social_platform: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                },
                user_name: {
                    type: DataTypes.STRING(100),
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
                modelName: "SocialMedia",
                tableName: "social_medias",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                underscored: true,
            }
        );

        return SocialMedia;
    }

    static associate(models) {
        SocialMedia.belongsTo(models.Venue, {
            foreignKey: "venue_code",
            targetKey: "venue_code",
            as: "venue",
            constraints: false
        });
    }
}

module.exports = SocialMedia;