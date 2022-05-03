/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
const Veiculo = require('./Veiculo');


const Pagamento = connection.define(
    'tbl_pagamento',
    {
        custo:{
           type: Sequelize.CHAR,
           allowNull: false
        },
        consumo_veiculo:{
            type: Sequelize.STRING,
            allowNull: false
        },

        fatura_veiculo:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);


/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/

Veiculo.hasMany(Pagamento);


/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/

Pagamento.belongsTo(Veiculo);

/*Executar a criação da tabela no Banco de Dados*/
//Pagamento.sync({force:true}); // Cria tabela no banco de dados ROVI_BR

module.exports = Pagamento;