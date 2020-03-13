'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'BackLog',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Todo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Done',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
