'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      channelId: DataTypes.STRING,
      playlistId: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
