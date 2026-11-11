"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("presentations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      projectId: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      venue: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      speaker: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      department: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      slidesUrl: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("presentations");
  },
};

