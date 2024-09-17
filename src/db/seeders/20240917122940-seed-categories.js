'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        title: "Electronics",
        description: "Devices and gadgets",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Clothing",
        description: "Men and women clothing",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Books",
        description: "Books of various genres",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Home & Kitchen",
        description: "Home appliances and kitchenware",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};

