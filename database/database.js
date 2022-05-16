const Sequelize = require("sequelize");

const connection = new Sequelize('AgroNature', 'root', 'bonita007', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;