/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
const Usuario = require('./Usuario');


const Cartao = connection.define(
    'tbl_cartao',
    {
        numero:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        titular:{
            type: Sequelize.STRING,
            allowNull: false
        },
        CPF:{
            type: Sequelize.STRING,
            allowNull: true
        },
        CVV:{
            type: Sequelize.STRING,
            allowNull: false
        },
        vaidade:{
            type: Sequelize.STRING,
            allowNull: false
        },
        apelido:{
            type: Sequelize.STRING,
            allowNull: true
        }
    }
);


/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/

Usuario.hasMany(Cartao);


/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/

Cartao.belongsTo(Usuario);


//Cartao.sync({force:true});   // Cria tabela no banco de dados ROVI_BR

module.exports = Cartao;