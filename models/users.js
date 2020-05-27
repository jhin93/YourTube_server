'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      picture: DataTypes.STRING,
      channelId: DataTypes.STRING,
      likePlaylistId: DataTypes.STRING,
      refreshToken: DataTypes.TEXT,
    },
    {},
  );
  Users.associate = function (models) {
    // Users.hasMany(models.Videos, { sourceKey: 'id', as: 'userId' });
  };
  return Users;
};
