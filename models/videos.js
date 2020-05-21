'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videos = sequelize.define(
    'Videos',
    {
      etag: DataTypes.STRING,
      videoId: DataTypes.STRING,
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
