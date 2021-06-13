module.exports = (sequelize, DataTypes) => {
  return sequelize.define('playlist', {
    mylistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    playId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};