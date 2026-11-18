"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("accounts", "role", {
      type: Sequelize.ENUM("admin", "pi", "member"),
      allowNull: false,
    });
    await queryInterface.changeColumn("gallery_items", "uploadedBy", {
      type: Sequelize.ENUM("admin", "pi", "member"),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("accounts", "role", {
      type: Sequelize.ENUM("pi", "member"),
      allowNull: false,
    });
    await queryInterface.changeColumn("gallery_items", "uploadedBy", {
      type: Sequelize.ENUM("pi", "member"),
      allowNull: true,
    });
  },
};

