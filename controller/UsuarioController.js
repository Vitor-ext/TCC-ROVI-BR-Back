const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const router = express.Router();

const Usuario = require('../model/Usuario');

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

router.post('/TB_Usuario/cadastrarTB_Usuario', upload.array('files', 2) ,(req, res)=>{

    console.log(req.files[0]);
    console.log(req.files[1]);
    console.log(req.body);

    const { nome, CPF, cnh, telefone, email, celular, endereco} = req.body;
    const foto = req.files[0].path;
    const foto_cnh = req.files[1].path;
    // console.log(cnh, foto)   Teste de envio das Imagens
    TB_USUARIO.create(
        {
            nome,
            CPF,
            cnh,
            telefone,
            foto,
            foto_cnh,
            email,
            endereco,
            celular
        }
    ).then(
        ()=>{
            res.send('DADOS INSERIDOS COM SUCESSO!');      
        }
    );

});

router.get('/Usuario/listarUsuario', (req, res)=>{

    TB_USUARIO.findAll()
          .then((UsuarioS)=>{
              res.send(UsuarioS)
          });
});

router.get('/Usuario/listarUsuarioCodigo/:id', (req, res)=>{

    const { id } = req.params

    TB_USUARIO.findByPk(id)
          .then((ID_Usuario)=>{
              res.send(ID_Usuario)
          });
});

router.delete('/Usuario/excluirUsuario/:id', (req, res)=>{

    const { id } = req.params;

    TB_USUARIO.findByPk(id)
         .then((Usuario)=>{

            const cnh = Usuario.cnh;
            const foto = Usuario.foto;

            TB_USUARIO.destroy({
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

                    fs.unlink(cnh, (error)=>{

                        if(error){
                            console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                        }else{
                            console.log('CNH EXCLUIDA COM SUCESSO! ');
                        } 
        
                    });

                    res.send('DADOS DO Usuario EXCLUIDO COM SUCESSO');

                }
        );


    });

});

router.put('/TB_Usuario/editarTB_Usuario', upload.array('files', 2), (req, res)=>{

    const {nome, telefone, email, celular, id } =req.body;

    /**UPFDATE COM IMAGEM */
    if(req.files != ''){

        TB_USUARIO.findByPk(id)
        .then((Usuario)=>{

            let cnh = Usuario.cnh;
            let foto = Usuario.foto;

            fs.unlink(foto, (error)=>{

                if(error){
                    res.send('ERRO AO EXLCUIR A IMAGEM: ' + error);
                }else{
                    res.send('IMAGEM PEQUENA EXCLUIDA COM SUCESSO! ');
                } 

            });

            /**Exclusão da imagem Grande */
            fs.unlink(cnh, (error)=>{

                if(error){
                    console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                }else{
                    console.log('IMAGEM GRANDE EXCLUIDA COM SUCESSO! ');
                } 
            });

            foto = req.files[0].path;
            cnh = req.files[1].path;

            /**ATUALIZAÇÃO DOS DADOS DO TB_USUARIO */
            TB_USUARIO.update(
                {nome,
                cnh,
                foto,
                telefone,
                email,
                celular,
                tblEspecialidadeId},
                {where: {id}}
             ).then(
                 ()=>{
                     res.send('DADOS DO USUARIO ALTERADOS COM SUCESSO!');
                 }
             );

        });
    }else{

            /**UPFDATE SEM IMAGEM */
    TB_USUARIO.update(
        {nome,
         telefone,
         email,
         celular},
         {where: {id}}
     ).then(
         ()=>{
             res.send('DADOS DE TB_USUARIO ALTERADOS COM SUCESSO!');
         }
     );

    }

});

module.exports = router;