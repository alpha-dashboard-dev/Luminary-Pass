const { Model, DataTypes } = require("sequelize");

class ChecklistAttachment extends Model {
  static initModel(sequelize) {
    ChecklistAttachment.init(
        {
          id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },

          attachment_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
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

          file_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          file_url: {
            type: DataTypes.STRING(500),
            allowNull: true,
          },

          attachment_type: {
            type: DataTypes.ENUM(
                "image",
                "video",
                "pdf",
                "document",
                "link"
            ),
            allowNull: false,
          },

          file_extension: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          file_size: {
            type: DataTypes.BIGINT,
            allowNull: true,
          },

          uploaded_by: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
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
          modelName: "ChecklistAttachment",
          tableName: "checklist_attachments",
          timestamps: true,
          createdAt: false,
          updatedAt: false,
          underscored: true,
        }
    );

    return ChecklistAttachment;
  }

  static associate(models) {
    // ChecklistAttachment.belongsTo(models.EventChecklist, {
    //     foreignKey: "checklist_code",
    //     targetKey: "checklist_code",
    //     as: "checklist",
    // });

    // ChecklistAttachment.belongsTo(models.User, {
    //     foreignKey: "uploaded_by",
    //     targetKey: "user_code",
    //     as: "uploader",
    // });
  }
}

module.exports = ChecklistAttachment;