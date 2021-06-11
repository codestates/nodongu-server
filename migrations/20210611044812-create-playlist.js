'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlist', {
      mylist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'mylist', key: 'id' },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      play_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'play', key: 'id' },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlist');
  }
};