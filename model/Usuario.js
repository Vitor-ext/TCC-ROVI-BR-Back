/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

const Usuario = connection.define(
    'tbl_usuario',
    {
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        CPF:{
            type: Sequelize.STRING,
            allowNull: false
        },
        CNH:{
            type: Sequelize.STRING,
            allowNull: true
        },
        telefone:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Foto:{
            type: Sequelize.STRING,
            allowNull: false
        },
        CNH:{
            type: Sequelize.STRING,
            allowNull: true
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        celular:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

//Usuario.sync({force:true});   // Cria tabela no banco de dados ROVI_BR
module.exports = Usuario;