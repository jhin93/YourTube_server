'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Edward Newgate',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          likePlaylistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kaido',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          likePlaylistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Charlotte Linlin',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          likePlaylistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Shanks',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          likePlaylistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Marshall D. Teach',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          likePlaylistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
