/*Importação do modulo do sequelize*/
const Sequelize = require('sequelize');

/*Criação da instância de conexão com o banco de dados com uso do Sequelize
Parametros
1º - Nome do Banco de Dados
2º - Usuário do Banco de Dados
3º - Senha do Banco de Dados
4º - Objeto json que determina as configurações da conexão
    1º Host do Banco
    2º Dialeto do Banco (Tipo do Banco = MYSQL)
    3° TimeZone - Determina o local pa ra as hora'Fuso horário'
*/


const connection = new Sequelize(
    'ROVI-BR',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;