"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("project_teams", {
      projectId: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      projectTitle: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pi: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      coInvestigators: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      members: {
        type: Sequelize.JSON,
        allowNull: false,
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
    await queryInterface.dropTable("project_teams");
  },
};

