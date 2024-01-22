var express = require('express');
var router = express.Router();
const dateNow = require('../services/dateNow.js')
const postSchema = require('../database/model/postSchema.js')


//PAGINA: CRIAR POST
router.get('/novo', async (req, res) => {
  res.render('newPost', {dateNow: dateNow()});
});
  


  
router.get('/editar', async (req, res) => {
  try {

    const data = await postSchema.find({}, 'metadata.title _id');
      res.render('editPost', {data: data})
  } catch (err) {
    res.status(500).json({ msg: 'Erro na consulta do post: ' + err.message });
  }
});
  
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
router.post('/new', (req, res) => {
  const newPost = new postSchema(req.body);

  console.log('#############################')
  console.log(req.body)
  console.log('#############################')
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