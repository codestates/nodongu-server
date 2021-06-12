
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('play', {
    musicid: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(80),
      allowNull: false,
    }
  });
};