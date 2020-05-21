'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Edward Newgate',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          playlistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Edward Newgate',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          playlistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Edward Newgate',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          playlistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Edward Newgate',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          playlistId: 'LLSeLavjR1tHXn65zXUAznnw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Edward Newgate',
          channelId: 'UCSeLavjR1tHXn65zXUAznnw',
          playlistId: 'LLSeLavjR1tHXn65zXUAznnw',
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
