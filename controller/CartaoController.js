const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const router = express.Router();

const Cartao = require('../model/Cartao');

/***** MULTER - STORAGE *****/
/** GERENCIA O ARMAZENAMENTO DOS ARQUIVOS **/
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now().toString() + '_'+ file.originalname);
    }
});

/***** MULTER - FILTER *****/
/** GERENCIA O TIPO DE ARQUIVO QUE PODE SER RECEBIDO **/
const fileFilter = (req, file, cb)=>{

    if( file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/png'){

        cb(null, true);

    }else{

        cb(null, false);

    }

}

/***** MULTER - UPLOAD *****/
/** EXECUTA O PROCESSO DE ARMAZENAMENTO **/
const upload = multer({
    storage: storage,
    limits:{ 
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/TB_Cartao/cadastrarTB_Cartao', upload.array('files', 1) ,(req, res)=>{

    console.log(req.files[0]);
    console.log(req.body);

    const { numero, titular, CPF, CVV, validade, apelido} = req.body;
    const foto = req.files[0].path;

    TB_CARTAO.create(
        {
            numero,
            titular,
            CPF,
            CVV,
            validade,
            apelido
        }
    ).then(
        ()=>{
            res.send('DADOS INSERIDOS COM SUCESSO!');      
        }
    );

});

router.get('/Cartao/listarCartao', (req, res)=>{

    TB_CARTAO.findAll()
          .then((Cartao)=>{
              res.send(Cartao)
          });
});

router.get('/Cartao/listarCartaoCodigo/:id', (req, res)=>{

    const { id } = req.params

    TB_CARTAO.findByPk(id)
          .then((ID_Cartao)=>{
              res.send(ID_Cartao)
          });
});

router.delete('/Cartao/excluirCartao/:id', (req, res)=>{

    const { id } = req.params;

    TB_CARTAO.findByPk(id)
         .then((Cartao)=>{

            const foto = Cartao.foto;

            TB_CARTAO.destroy({
                where:{id}
            }).then(
                ()=>{
                    fs.unlink(foto, (error)=>{

                        if(error){
                            res.send('ERRO AO EXLCUIR A IMAGEM: ' + error);
                        }else{
                            res.send('FOTO EXCLUIDA COM SUCESSO! ');
                        } 
        
                    });

                    res.send('DADOS DO CARTAO EXCLUIDO COM SUCESSO');

                }
        );


    });

});

router.put('/TB_Cartao/editarTB_Cartao', upload.array('files', 1), (req, res)=>{

    const {numero, titular, CPF, CVV, validade, apelido, id } =req.body;

    /**UPFDATE COM IMAGEM */
    if(req.files != ''){

        TB_CARTAO.findByPk(id)
        .then((Cartao)=>{

            let foto = Cartao.foto;

            fs.unlink(foto, (error)=>{

                if(error){
                    res.send('ERRO AO EXLCUIR A IMAGEM: ' + error);
                }else{
                    res.send('FOTO DO CARTAO EXCLUIDA COM SUCESSO! ');
                } 

            });

            foto = req.files[0].path;

            /**ATUALIZAÇÃO DOS DADOS DO TB_CARTAO */
            TB_CARTAO.update(
                {numero, 
                titular,
                CPF,
                CVV,
                validade,
                apelido,
                tblUsuarioId},
                {where: {id}}
             ).then(
                 ()=>{
                     res.send('DADOS DO CARTAO ALTERADOS COM SUCESSO!');
                 }
             );

        });
    }else{

            /**UPFDATE SEM IMAGEM */
    TB_CARTAO.update(
        {numero, 
        titular,
        CPF,
        CVV,
        validade,
        apelido},
        {where: {id}}
     ).then(
         ()=>{
             res.send('DADOS DO CARTAO ALTERADOS COM SUCESSO!');
         }
     );

    }

});

module.exports = router;