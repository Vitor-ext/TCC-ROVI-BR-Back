const express = require('express');

const Veiculo = require('../model/Veiculo');

/** CONFIGURAÇÃO DAS ROTAS **/
const router = express.Router();

router.post(
    '/veiculo/cadastrarVeiculo',
    (req, res)=>{
       
        
        let { nome_veiculo } = req.body;

        TB_VEICULO.create(
            {nome_Veiculo,
             placa_Veiculo,
             chassi_Veiculo,
             modelo_Veiculo,
             marca_Veiculo
            }
        ).then(
            ()=>{
                res.send('DADOS DE VEICULO INSERIDOS COM SUCESSO!');
            }
        );

    }
);

/* ROTA DE LISTAGEM GERAL DE CATEGORIA (VERBO HTTP: GET)*/
router.get(
    '/Veiculo/listarVeiculo',
    (req, res)=>{
        TB_VEICULO.findAll()
                 .then(
                     (Veiculos)=>{
                        res.send(Veiculos);
                     }
                 );
    }
);

/* ROTA DE LISTAGEM POR ID DE CATEGORIA (VERBO HTTP: GET)*/
router.get( '/Veiculo/listarVeiculo/:id', (req, res)=>{

    let {id} = req.params;
    TB_VEICULO.findByPk(id)
             .then(
                 (Veiculo)=>{
                    res.send(Veiculo);
                }
    );

});

/* ROTA DE ALTERAÇÃO DE CATEGORIA (VERBO HTTP: PUT)*/
router.put(
    '/Veiculo/alterarVeiculo',
    (req, res)=>{

    
        let {id, nome_Veiculo, placa_Veiculo, chassi_Veiculo, modelo_Veiculo, marca_Veiculo} = req.body;

        TB_VEICULO.update(
                {nome_Veiculo},
                {placa_Veiculo},
                {chassi_Veiculo},
                {modelo_Veiculo},
                {marca_Veiculo},
                {where: {id}}
        ).then(
            ()=>{
                res.send('DADOS DO VEICULO ALTERADOS COM SUCESSO!');
            }
        );

    }
);
/* ROTA DE EXCLUSÃO DE CATEGORIA (VERBO HTTP: DELETE)*/
router.delete(
    '/Veiculo/excluirVeiculo',
    (req, res)=>{

        let {id} = req.body;

        TB_VEICULO.destroy(
            {where: {id}}
        ).then(

            ()=>{
                res.send('Veiculo EXCLUÍDO COM SUCESSO!');
            }

        );

    }
);

module.exports = router;