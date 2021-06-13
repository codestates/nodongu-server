'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlists', {
      mylistId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "mylists", key: "id" },
        onDelete: 'CASCADE'
      },
      playId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "plays", key: "id" },
				onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlists');
  }
};