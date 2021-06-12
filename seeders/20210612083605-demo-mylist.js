'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mylists', [
      {
        listtitle: 'sampleList',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listtitle: 'sampleList2',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
