"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      event_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },

      business_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      venue_code: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },


      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      start_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      end_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },


      application_deadline: {
        type: Sequelize.DATE,
        allowNull: true,
      },


      influencer_capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },


      description_influencer_received: {
        type: Sequelize.TEXT,
        allowNull: true,
      },


      offer_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },


      dress_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },


      additional_guests: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },


      special_instructions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },


      visibility: {
        type: Sequelize.ENUM(
            "public",
            "private"
        ),
        allowNull: true,
      },


      created_by: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },


      status: {
        type: Sequelize.ENUM(
            "draft",
            "published",
            "closed",
            "live",
            "completed",
            "cancelled"
        ),
        defaultValue: "draft",
      },


      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });


    // Indexes

    await queryInterface.addIndex(
        "events",
        ["business_code"]
    );

    await queryInterface.addIndex(
        "events",
        ["venue_code"]
    );

    await queryInterface.addIndex(
        "events",
        ["status"]
    );

    await queryInterface.addIndex(
        "events",
        ["visibility"]
    );

    await queryInterface.addIndex(
        "events",
        ["start_date"]
    );

    await queryInterface.addIndex(
        "events",
        ["application_deadline"]
    );
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("events");

    // Remove ENUM types for PostgreSQL
    await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_events_visibility";'
    );

    await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_events_status";'
    );
  },
};