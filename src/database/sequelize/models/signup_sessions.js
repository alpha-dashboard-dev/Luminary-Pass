const { Model, DataTypes } = require("sequelize");

class SignupSession extends Model {
    static initModel(sequelize) {
        SignupSession.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },

                signup_code: {
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

                account_type: {
                    type: DataTypes.STRING(150),
                    allowNull: false,
                },

                current_step: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                status: {
                    type: DataTypes.ENUM("draft", "pending", "approved", "completed", "in_progress"),
                    allowNull: false,
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
                modelName: "SignupSession",
                tableName: "signup_sessions",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                underscored: true,
            }
        );

        return SignupSession;
    }

    static associate(models) {
        SignupSession.belongsTo(models.User, {
            foreignKey: "user_code",
            targetKey: "user_code",
            as: "user",
            constraints: false
        })
    }
}

module.exports = SignupSession;