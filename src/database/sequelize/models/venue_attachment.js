const { Model, DataTypes } = require("sequelize");

class VenueAttachment extends Model {
  static initModel(sequelize) {
    VenueAttachment.init(
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

          attachment_type: {
            type: DataTypes.ENUM("image", "video", "link"),
            allowNull: false,
          },

          attachment_platform_category: {
            type: DataTypes.ENUM(
                "instagram",
                "facebook",
                "youtube",
                "website",
                "twitter",
                "tiktok"
            ),
            allowNull: false,
            defaultValue: "instagram",
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
          modelName: "VenueAttachment",
          tableName: "venue_attachments",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          underscored: true,
        }
    );

    return VenueAttachment;
  }

  static associate(models) {
    VenueAttachment.belongsTo(models.Venue, {
        foreignKey: "venue_code",
        targetKey: "venue_code",
        as: "venueAttachment",
        constraints: false
    });
  }
}

module.exports = VenueAttachment;