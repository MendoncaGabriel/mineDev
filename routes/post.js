var express = require('express');
var router = express.Router();
const dateNow = require('../services/dateNow.js')
const postSchema = require('../database/model/postSchema.js')


//PAGINA: CRIAR POST
router.get('/novo', async (req, res) => {
  res.render('newPost', {dateNow: dateNow()});
});
  

router.get('/edit/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const urlTitle = title.replace(/-/g, ' ');

    const data = await postSchema.findOne({'metadata.title': urlTitle});

    if (!data) {
      res.status(404).json({ msg: 'Post não encontrado' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Erro na consulta do post: ' + err.message });
  }
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