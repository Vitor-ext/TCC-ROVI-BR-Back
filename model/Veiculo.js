/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
const Usuario = require('./Usuario');


const Veiculo = connection.define(
    'tbl_veiculo',
    {
        nome_veiculo:{
           type: Sequelize.STRING,
           allowNull: false
        },
        placa_veiculo:{
            type: Sequelize.STRING,
            allowNull: false
        },

        chassi_veiculo:{
            type: Sequelize.STRING,
            allowNull: false
        },

        modelo_veiculo:{
            type: Sequelize.STRING,
            allowNull: false
        },

        marca_veiculo:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);


/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/

Usuario.hasMany(Veiculo);


/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/

Veiculo.belongsTo(Usuario);

/*Executar a criação da tabela no Banco de Dados*/
//Veiculo.sync({force:true}); // Cria tabela no banco de dados ROVI_BR

module.exports = Veiculo;