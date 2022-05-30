const Sequelize = require("sequelize");

const connection = new Sequelize('cadastro', 'root', '123456789', {
  host: '34.135.224.19',
  dialect: 'mysql',
  port: 3306
});

module.exports = connection;