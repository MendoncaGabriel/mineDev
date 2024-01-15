var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MineDev' });
});

router.get('/:article', function(req, res, next) {
  const article = req.params.article
  res.render('article', { title: article });
});

module.exports = router;
