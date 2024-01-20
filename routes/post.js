var express = require('express');
var router = express.Router();
const dateNow = require('../services/dateNow.js')
const postSchema = require('../database/model/postSchema.js')


//PAGINA: CRIAR POST
router.get('/novo', async (req, res) => {
  res.render('newPost', {dateNow: dateNow()});
});
  

//PUBLICAR POST
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