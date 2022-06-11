/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');


const Processo = connection.define(
    'tbl_processo',
    {
        carga_identificada:{
           type: Sequelize.STRING,
           allowNull: false
        },
        carga_atual:{
            type: Sequelize.STRING,
            allowNull: false
        },

        carga_consumida:{
            type: Sequelize.STRING,
            allowNull: false
        },

        tempo_previsto:{
            type: Sequelize.CHAR,
            allowNull: false
        }
    }
);


/*Executar a criação da tabela no Banco de Dados*/
//Processo.sync({force:true}); // Cria tabela no banco de dados ROVI_BR

module.exports = Processo;