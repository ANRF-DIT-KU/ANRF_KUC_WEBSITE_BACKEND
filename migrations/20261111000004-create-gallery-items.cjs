"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("gallery_items", {
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
      src: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      uploadedBy: {
        type: Sequelize.ENUM("pi", "member"),
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
    await queryInterface.dropTable("gallery_items");
  },
};

