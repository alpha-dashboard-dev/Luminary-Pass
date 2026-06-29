const { Model, DataTypes } = require("sequelize");

class Attachment extends Model {
  static initModel(sequelize) {
    Attachment.init(
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

          entity_type: {
            type: DataTypes.ENUM(
                "users",
                "influencers",
                "organization",
                "business",
                "events"
            ),
            allowNull: false,
            defaultValue: "users",
          },

          entity_code: {
            type: DataTypes.STRING(8),
            allowNull: false,
          },

          title: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          media_type: {
            type: DataTypes.ENUM("image", "video", "document", "website"),
            allowNull: false,
            defaultValue: "image",
          },

          file_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },

          file_extension: {
            type: DataTypes.STRING(20),
            allowNull: true,
          },

          file_size: {
            type: DataTypes.BIGINT,
            allowNull: true,
          },

          url: {
            type: DataTypes.STRING(500),
            allowNull: true,
          },

          is_primary: {
            type: DataTypes.ENUM("yes", "no"),
            allowNull: false,
            defaultValue: "no",
          },

          visibility: {
            type: DataTypes.ENUM("public", "private"),
            allowNull: false,
            defaultValue: "private",
          },

          uploaded_by: {
            type: DataTypes.STRING(8),
            allowNull: true,
            validate: {
              is: /^[A-Za-z0-9]{8}$/,
            },
          },

          display_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },

          status: {
            type: DataTypes.ENUM("active", "deleted"),
            allowNull: false,
            defaultValue: "active",
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
          modelName: "Attachment",
          tableName: "attachments",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return Attachment;
  }

  static associate(models) {
    // Polymorphic relations (handled in service layer)
  }
}

module.exports = Attachment;