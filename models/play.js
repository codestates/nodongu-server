
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('play', {
    musicid: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(40),
    },
    thumbnail: {
      type: DataTypes.STRING(80),
    },
    duration: {
      type: DataTypes.STRING(80),
    }
  });
};