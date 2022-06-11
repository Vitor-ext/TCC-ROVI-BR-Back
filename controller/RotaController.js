const express = require('express');

const Rota = require('../model/Rota');

/** CONFIGURAÇÃO DAS ROTAS **/
const router = express.Router();

router.post(
    '/Rota/cadastrarRota',
    (req, res)=>{
       
        
        let { Rota } = req.body;

        TB_ROTA.create(
            {local,
             destino,
             percurso,
             KM
            }
        ).then(
            ()=>{
                res.send('DADOS DE ROTAS INSERIDOS COM SUCESSO!');
            }
        );

    }
);

/* ROTA DE LISTAGEM GERAL DE CATEGORIA (VERBO HTTP: GET)*/
router.get(
    '/Rota/listarRota',
    (req, res)=>{
        TB_ROTA.findAll()
                 .then(
                     (Rotas)=>{
                        res.send(Rotas);
                     }
                 );
    }
);

/* ROTA DE LISTAGEM POR ID DE CATEGORIA (VERBO HTTP: GET)*/
router.get( '/Rota/listarRota/:id', (req, res)=>{

    let {id} = req.params;
    TB_ROTA.findByPk(id)
             .then(
                 (Rota)=>{
                    res.send(Rota);
                }
    );

});

/* ROTA DE ALTERAÇÃO DE CATEGORIA (VERBO HTTP: PUT)*/
router.put(
    '/Rota/alterarRota',
    (req, res)=>{

    
        let {id, local, destino,percurso, KM} = req.body;

        TB_ROTA.update(
                {local},
                {destino},
                {percurso},
                {KM},
                {where: {id}}
        ).then(
            ()=>{
                res.send('DADOS DO ROTA ALTERADOS COM SUCESSO!');
            }
        );

    }
);
/* ROTA DE EXCLUSÃO DE CATEGORIA (VERBO HTTP: DELETE)*/
router.delete(
    '/Rota/excluirRota',
    (req, res)=>{

        let {id} = req.body;

        TB_ROTA.destroy(
            {where: {id}}
        ).then(

            ()=>{
                res.send('ROTA EXCLUÍDA COM SUCESSO!');
            }

        );

    }
);

module.exports = router;