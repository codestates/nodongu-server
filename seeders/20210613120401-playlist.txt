// playlist
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('playlists', [
      {
        mylistId: 1,
        playId: 1,
      },
      {
        mylistId: 1,
        playId: 2,
      },
      {
        mylistId: 1,
        playId: 3,
      },
      {
        mylistId: 2,
        playId: 2,
      },
      {
        mylistId: 2,
        playId: 3,
      },
      {
        mylistId: 2,
        playId: 4,
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