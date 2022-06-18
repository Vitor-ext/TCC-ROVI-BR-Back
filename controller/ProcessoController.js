const express = require('express');

const Processo = require('../model/Processo');



/** CONFIGURAÇÃO DAS PROCESSOS **/
const router = express.Router();

router.post(
    '/Processo/cadastrarProcesso',
    (req, res)=>{
       
        let { Processo } = req.body;

        TB_PROCESSO.create(
            {carga_identificada,
             carga_atual,
             carga_consumida,
             tblUsuarioId       // Pedir Ajuda Adriano 
            }
        ).then(
            ()=>{
                res.send('DADOS DE PROCESSOS INSERIDOS COM SUCESSO!');
            }
        );

    }
);

/* PROCESSO DE LISTAGEM GERAL DE CATEGORIA (VERBO HTTP: GET)*/
router.get(
    '/Processo/listarProcesso',
    (req, res)=>{
        TB_PROCESSO.findAll()
                 .then(
                     (Processos)=>{
                        res.send(Processos);
                     }
                 );
    }
);

/* Processo DE LISTAGEM POR ID DE CATEGORIA (VERBO HTTP: GET)*/
router.get( '/Processo/listarProcesso/:id', (req, res)=>{

    let {id} = req.params;
    TB_PROCESSO.findByPk(id)
             .then(
                 (Processo)=>{
                    res.send(Processo);
                }
    );

});

/* PROCESSO DE ALTERAÇÃO DE CATEGORIA (VERBO HTTP: PUT)*/
router.put(
    '/Processo/alterarProcesso',
    (req, res)=>{

    
        let {id, carga_identificada, carga_consumida, carga_atual, tempo_previsto} = req.body;

        TB_PROCESSO.update(
                {carga_identificada},
                {carga_consumida},
                {carga_atual},
                {tempo_previsto},
                {where: {id}}
        ).then(
            ()=>{
                res.send('DADOS DO PROCESSO ALTERADOS COM SUCESSO!');
            }
        );

    }
);
/* PROCESSO DE EXCLUSÃO DE CATEGORIA (VERBO HTTP: DELETE)*/
router.delete(
    '/Processo/excluirProcesso',
    (req, res)=>{

        let {id} = req.body;

        TB_PROCESSO.destroy(
            {where: {id}}
        ).then(

            ()=>{
                res.send('PROCESSO EXCLUÍDA COM SUCESSO!');
            }

        );

    }
);

module.exports = router;