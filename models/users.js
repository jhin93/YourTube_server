'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   defaultValue: 0,
      // },
      channelId: DataTypes.STRING,
      likePlaylistId: DataTypes.STRING,
      refreshToken: DataTypes.TEXT,
    },
    {}
  );
  Users.associate = function (models) {
    // Users.hasMany(models.Videos, { sourceKey: 'id', as: 'userId' });
  };
  return Users;
};
