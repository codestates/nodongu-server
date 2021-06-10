'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mylist.belongsTo(models.user, {
        foreignKey: { name: "user_id", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  };
  mylist.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    videoid: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mylist',
  });
  return mylist;
};