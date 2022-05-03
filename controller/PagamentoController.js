const express = require('express');

const Pagamento = require('../model/Pagamento');

/** CONFIGURAÇÃO DAS ROTAS **/
const router = express.Router();

router.post(
    '/Pagamento/cadastrarPagamento',
    (req, res)=>{
       
        
        let { Pagamento } = req.body;

        TB_PAGAMENTO.create(
            {custo,
             consumo_Veiculo,
             fatura_Veiculo
            }
        ).then(
            ()=>{
                res.send('DADOS DE PAGAMENTO INSERIDOS COM SUCESSO!');
            }
        );

    }
);

/* ROTA DE LISTAGEM GERAL DE CATEGORIA (VERBO HTTP: GET)*/
router.get(
    '/Pagamento/listarPagamento',
    (req, res)=>{
        TB_PAGAMENTO.findAll()
                 .then(
                     (Pagamentos)=>{
                        res.send(Pagamentos);
                     }
                 );
    }
);

/* ROTA DE LISTAGEM POR ID DE CATEGORIA (VERBO HTTP: GET)*/
router.get( '/Pagamento/listarPagamento/:id', (req, res)=>{

    let {id} = req.params;
    TB_PAGAMENTO.findByPk(id)
             .then(
                 (Pagamento)=>{
                    res.send(Pagamento);
                }
    );

});

/* ROTA DE ALTERAÇÃO DE CATEGORIA (VERBO HTTP: PUT)*/
router.put(
    '/Pagamento/alterarPagamento',
    (req, res)=>{

    
        let {id, custo, consumo_Veiculo, fatura_Veiculo} = req.body;

        TB_PAGAMENTO.update(
                {custo},
                {consumo_Veiculo},
                {fatura_Veiculo},
                {where: {id}}
        ).then(
            ()=>{
                res.send('DADOS DO PAGAMENTO ALTERADOS COM SUCESSO!');
            }
        );

    }
);
/* ROTA DE EXCLUSÃO DE CATEGORIA (VERBO HTTP: DELETE)*/
router.delete(
    '/Pagamento/excluirPagamento',
    (req, res)=>{

        let {id} = req.body;

        TB_PAGAMENTO.destroy(
            {where: {id}}
        ).then(

            ()=>{
                res.send('PAGAMENTO EXCLUÍDO COM SUCESSO!');
            }

        );

    }
);

module.exports = router;