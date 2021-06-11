'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class play extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      play.belongsToMany(models.mylist, {
        through: 'playlist',
        as: 'link_mylist',
        foreignKey: 'play_id'
      });
    }
  };
  play.init({
    title: DataTypes.STRING,
    videoid: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'play',
  });
  return play;
};