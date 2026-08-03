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
                "user",
                "influencer",
                "organization",
                "business",
                "event",
                "venue"
            ),
            allowNull: true,
          },

          entity_code: {
            type: DataTypes.STRING(8),
            allowNull: true,
          },
            attachment_category: {
                type: DataTypes.ENUM(
                    "profile_picture",
                    "cover_image",
                    "gallery",
                    "logo",
                    "banner",
                    "portfolio",
                    "proof",
                    "menu",
                    "contract",
                    "invoice",
                    "document",
                    "reference",
                    "social_link",
                    "other"
                ),
                allowNull: true,
                defaultValue: "other",
            },

          title: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

          media_type: {
            type: DataTypes.ENUM("image", "video", "document", "link"),
            allowNull: false,
            defaultValue: "image",
          },
            disk: {
                type: DataTypes.ENUM(
                    "local",
                    "public",
                    "cloudinary"
                ),
                allowNull: false,
                defaultValue: "cloudinary",
            },

            folder: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            file_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
            original_file_name: {
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

            public_id: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            secure_url: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

          is_primary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
            type: DataTypes.ENUM("active", "archived", "deleted"),
            allowNull: false,
            defaultValue: "active",
          },
          file_hash: {
              type: DataTypes.STRING(64),
              allowNull: true,
          }  ,

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