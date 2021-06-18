
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('mylist', {
    listTitle: {
      type: DataTypes.STRING(40),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};