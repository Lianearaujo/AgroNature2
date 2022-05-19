const Sequelize = require("sequelize");
const connection = require("./database");

const Lista = connection;
Lista.sync().then(function () {
  cadastros.findAll().then(function(cadastros) {
    console.log(cadastros.dataValues)
});
});


module.exports = Lista;