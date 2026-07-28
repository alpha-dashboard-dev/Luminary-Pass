const { Model, DataTypes } = require("sequelize");

class Notification extends Model {
    static initModel(sequelize) {
        Notification.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },
                notification_code: {
                    type: DataTypes.STRING(8),
                    allowNull: false,
                    validate: {
                        is: /^[A-Za-z0-9]{8}$/,
                    }
                },

                user_code: {
                    type: DataTypes.STRING(8),
                    allowNull: true,
                    validate: {
                        is: /^[A-Za-z0-9]{8}$/,
                    },
                },

                title: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                body: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                type: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                reference_code: {
                    type: DataTypes.STRING(8),
                    allowNull: true,
                    validate: {
                        is: /^[A-Za-z0-9]{8}$/,
                    }
                },
                is_read: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },

                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Notification",
                tableName: "notifications",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                underscored: true,
            }
        );

        return Notification;
    }

    static associate(models) {
    }
}

module.exports = Notification;