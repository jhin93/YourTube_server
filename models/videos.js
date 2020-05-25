'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videos = sequelize.define(
    'Videos',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        auto_increament: true,
        defaultValue: 0,
      },
      etag: DataTypes.STRING,
      videoId: DataTypes.STRING,
      channelId: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
    },
    {}
  );
  Videos.associate = function (models) {
    // associations can be defined here
  };
  return Videos;
};
