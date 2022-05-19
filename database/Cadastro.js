const Sequelize = require("sequelize");
const connection = require("./database");

const Cadastro = connection.define('cadastros', {
  nome: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  telefone: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  complemento: {
    type: Sequelize.TEXT,
    allowNull: true
  },

  endereco: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  

  data: {
    type: Sequelize.DATE,
    allowNull: true
  }
})

Cadastro.sync({force: false}).then(() => {});

module.exports = Cadastro;