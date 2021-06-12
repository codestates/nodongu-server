
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('play', {
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    videoid: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(80),
      allowNull: false,
    }
  });
};