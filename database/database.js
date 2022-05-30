const Sequelize = require("sequelize");

const connection = new Sequelize('cadastro', 'root', '123456789', {
  host: '10.81.160.3',
  dialect: 'mysql',
  port: 3306
});

module.exports = connection;