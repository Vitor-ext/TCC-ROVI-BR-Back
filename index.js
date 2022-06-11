/* Importação do pacote express */
const express = require('express');;

/*Instancia executavel do express */
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*Importação da conexão com o banco de dados*/
const connection = require('./database/database')

/*Importação das models*/
const TB_USUARIO = require('./model/Usuario');
const Veiculo = require('./model/Veiculo');
const Pagamento = require('./model/Pagamento');
const Cartao = require('./model/Cartao');
const Rota = require('./model/Rota');
const Processo = require('./model/Processo');

/*Importação das rotas*/
const veiculoController = require('./controller/VeiculoController');
app.use('/', veiculoController);

const usuarioController = require('./controller/UsuarioController');
app.use('/', usuarioController);

const pagamentoController = require('./controller/PagamentoController');
app.use('/', pagamentoController);

const cartaoController = require('./controller/Cartaocontroller');
app.use('/', cartaoController);

const RotaController = require('./controller/Rotacontroller');
app.use('/', RotaController);

const ProcessoController = require('./controller/Processocontroller');
app.use('/', ProcessoController);


/*Servidor de requisições da aplicação */
app.listen(3000, ()=>{
    console.log('Servidor Rodando na Porta 3000 - URL: http://Localhost:3000/');
}); 