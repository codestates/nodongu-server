'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.mylist = require('./mylist')(sequelize, Sequelize);
db.play = require('./play')(sequelize, Sequelize);
db.playlist = require('./playlist')(sequelize, Sequelize);

/* user : mylist = 1 : N */
db.user.hasMany(db.mylist);
db.mylist.belongsTo(db.user, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
/* mylist : playlist = 1 : N */
db.mylist.hasMany(db.playlist);
db.playlist.belongsTo(db.mylist, {
  foreignKey: 'mylistId', 
  onDelete: 'CASCADE'
});
/* play : playlist = 1 : N */
db.play.hasMany(db.playlist);
db.playlist.belongsTo(db.play, {
  foreignKey: 'playId', 
  onDelete: 'CASCADE'
});


module.exports = db;
