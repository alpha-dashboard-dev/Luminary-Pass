const { Model, DataTypes } = require("sequelize");

class OnboardingSession extends Model {
    static initModel(sequelize) {
        OnboardingSession.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },

                onboarding_code: {
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
                    unique: true,
                    validate: {
                        is: /^[A-Za-z0-9]{8}$/,
                    },
                },

                current_step: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                completed_step: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                status: {
                    type: DataTypes.ENUM("pending", "approved", "completed", "in_progress"),
                    allowNull: false,
                    defaultValue: "pending",
                },
                signup_token: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                expires_at: {
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
                modelName: "OnboardingSession",
                tableName: "onboarding_sessions",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                underscored: true,
            }
        );

        return OnboardingSession;
    }

    static associate(models) {
        OnboardingSession.belongsTo(models.User, {
            foreignKey: "user_code",
            targetKey: "user_code",
            as: "user",
            constraints: false
        })
    }
}

module.exports = OnboardingSession;