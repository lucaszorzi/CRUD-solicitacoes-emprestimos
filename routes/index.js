var express = require('express');
var router = express.Router();
var crudController = require('../controllers/crudController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cadastro de solicitações de empréstimos' });
});

router.post('/add', crudController.add);

router.get('/list', crudController.list);

router.delete('/delete/:id', crudController.delete);

router.put('/edit/:id', crudController.edit);

module.exports = router;