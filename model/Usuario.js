/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

const TB_USUARIO = connection.define( 
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
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        senha:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

//TB_USUARIO.sync({force:true});   // Cria tabela no banco de dados ROVI_BR
module.exports = TB_USUARIO;