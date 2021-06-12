
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('mylist', {
    listtitle: {
      type: DataTypes.STRING(80),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    });
};