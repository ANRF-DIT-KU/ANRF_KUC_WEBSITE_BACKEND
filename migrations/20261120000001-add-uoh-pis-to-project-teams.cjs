"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("project_teams", "uohPis", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      "UPDATE project_teams SET uohPis = JSON_ARRAY() WHERE uohPis IS NULL",
    );

    await queryInterface.changeColumn("project_teams", "uohPis", {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("project_teams", "uohPis");
  },
};
