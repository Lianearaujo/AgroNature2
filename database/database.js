const Sequelize = require("sequelize");

const connection = new Sequelize('cadastro', 'root', '123456789', {
  host: '34.82.206.27',
  dialect: 'mysql'
});

module.exports = connection;