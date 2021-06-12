
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
    },
    });
};