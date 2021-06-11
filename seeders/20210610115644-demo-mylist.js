'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mylist', [{
      name: 'mylist-sample',
      title: 'lofi hip hop radio - beats to relax/study to',
      videoid: '5qap5aO4i9A',
      thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault_live.jpg",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
