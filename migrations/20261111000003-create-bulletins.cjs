"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bulletins", {
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
      volume: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      issue: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      publishDate: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      themeColor: {
        type: Sequelize.ENUM("teal", "navy"),
        allowNull: false,
        defaultValue: "teal",
      },
      downloadUrl: {
        type: Sequelize.STRING(512),
        allowNull: false,
        defaultValue: "#",
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
    await queryInterface.dropTable("bulletins");
  },
};

