"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add displayOrder column to project_teams
    await queryInterface.addColumn("project_teams", "displayOrder", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    // 2. Set the order according to the project list in the seed file
    const orderedProjectIds = [
      "biotech",
      "sports-science",
      "it",
      "chemistry",
      "mol-bio",
      "zoology",
    ];

    for (let i = 0; i < orderedProjectIds.length; i++) {
      await queryInterface.sequelize.query(
        `UPDATE project_teams SET displayOrder = ${i + 1} WHERE projectId = '${orderedProjectIds[i]}'`
      );
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("project_teams", "displayOrder");
  },
};
