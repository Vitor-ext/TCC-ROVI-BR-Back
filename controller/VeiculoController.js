const express = require('express');

const VEICULO = require('../model/Veiculo');
const TB_USUARIO = require('../model/Usuario');

/** CONFIGURAÇÃO DAS ROTAS **/
const router = express.Router();

router.post(
    '/veiculo/cadastrarVeiculo',
    async (req, res)=>{

        const {
            nome_veiculo, 
            placa_veiculo,
            chassi_veiculo,
            modelo_veiculo,
            marca_veiculo,
            CPF
        } = req.body; 


    const user=  await TB_USUARIO.findOne({
        where:{CPF:CPF} 
    });
    if(user){
        const tblUsuarioId = user.id;   
        
        console.log(req.body);  //teste

        VEICULO.create(
            {nome_veiculo,
             placa_veiculo,
             chassi_veiculo,
             modelo_veiculo,
             marca_veiculo,
             tblUsuarioId,
            }
        ).then(
            ()=>{
                res.send('DADOS DE VEICULO INSERIDOS COM SUCESSO!');
            }
        );

    }else{
        res.send('CPF Inválido !'); 
        console.log('CPF Inválido !');
    }
});

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
    VEICULO.findByPk(id)
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

        VEICULO.update(
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

        VEICULO.destroy(
            {where: {id}}
        ).then(

            ()=>{
                res.send('Veiculo EXCLUÍDO COM SUCESSO!');
            }

        );

    }
);

module.exports = router;