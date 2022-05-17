const Sequelize = require("sequelize");

const connection = new Sequelize('AgroNature', 'p101332359097-94p8te@gcp-sa-cloud-sql.iam.gserviceaccount.com', '123456789', {
  host: '10.90.192.4',
  dialect: 'mysql'
});

module.exports = connection;