const { Model, DataTypes } = require('sequelize');

class Organization extends Model {
  static initModel(sequelize) {
    Organization.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      organization_code: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        validate: {
          is: /^[A-Za-z0-9]{8}$/,
        },
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
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
    }, {
      sequelize,
      modelName: 'Organization',
      tableName: 'organizations',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    });

    return Organization;
  }

  static associate(models) {
    Organization.hasMany(models.User, {
      foreignKey: "organization_code",
      sourceKey: "organization_code",
      as: "users",
      constraints: false,
    })
  }
}

module.exports = Organization;