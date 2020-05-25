'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        auto_increament: true,
        defaultValue: 0,
      },
      name: DataTypes.STRING,
      channelId: DataTypes.STRING,
      likePlaylistId: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
