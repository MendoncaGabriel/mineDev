var express = require('express');
var router = express.Router();

const postSchema = require('../database/model/postSchema.js')


// Autenticação
require('dotenv').config()



 
//PUXAR DADOS DO POST
router.get('/:id', async (req, res) => {
  try {
    console.log('buscando')
    const id = req.params.id
    const data = await postSchema.findById(id);
    console.log(data)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ msg: 'Erro na consulta do post: ' + err.message });
  }
});
  
  
//PUBLICAR POST
router.patch('/:id', (req, res) => {
  const id = req.params.id
  const newData = req.body
  postSchema.findByIdAndUpdate(id, newData)
  .then((doc) => {
    res.status(201).json(doc);
    console.log('Post atualizado com sucesso!');
  })
  .catch((err) => {
    res.status(500).json({ erro: err });
    console.log('Erro ao atualizar post!:', err);
  });
});


router.delete('/:id', (req, res) => {
  const id = req.params.id
  postSchema.findByIdAndDelete(id)
  .then((doc) => {
    res.status(200).json(doc);
    console.log('Post deletado com sucesso!');
  })
  .catch((err) => {
    res.status(500).json({ erro: err });
    console.log('Erro ao deletar post!:', err);
  });
});


router.post('/new', (req, res) => {
  const newPost = new postSchema(req.body);
  newPost.save()
  .then((doc) => {
    res.status(201).json(doc);
    console.log('Post salvo com sucesso!');
  })
  .catch((err) => {
    res.status(500).json({ erro: err });
    console.log('Erro ao salvar post!:', err);
  });
});


module.exports = router;