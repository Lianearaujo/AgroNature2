const Sequelize = require("sequelize");

const connection = new Sequelize('AgroNature', 'rootadmin@agriculaliane', 'Liane@araujo2128', {
  host: 'agriculaliane.mysql.database.azure.com',
  dialect: 'mysql'
});

module.exports = connection;