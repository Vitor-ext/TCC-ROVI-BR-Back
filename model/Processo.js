/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
const Usuario = require('./Usuario');

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
        }
    }
);


/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/

Usuario.hasMany(Processo);


/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/

Processo.belongsTo(Usuario);

/*Executar a criação da tabela no Banco de Dados*/
//Processo.sync({force:true}); // Cria tabela no banco de dados ROVI_BR

module.exports = Processo;