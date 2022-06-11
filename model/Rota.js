/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');


const Rota = connection.define(
    'tbl_rota',
    {
        local:{
           type: Sequelize.STRING,
           allowNull: false
        },
        destino:{
            type: Sequelize.STRING,
            allowNull: false
        },

        percurso:{
            type: Sequelize.STRING,
            allowNull: false
        },

        KM:{
            type: Sequelize.CHAR,
            allowNull: false
        }
    }
);


/*Executar a criação da tabela no Banco de Dados*/
//Rota.sync({force:true}); // Cria tabela no banco de dados ROVI_BR

module.exports = Rota;