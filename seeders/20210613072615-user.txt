//user
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'a@b.com',
        nickname: 'c',
        password: 'd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: '88parksw@gmail.com',
        nickname: 'sasha',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'liske@naver.com',
        nickname: 'lisa',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'coco@gmail.com',
        nickname: 'coco',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
