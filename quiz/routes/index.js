var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});


// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


/* GET author */
router.get('/author', quizController.author);

module.exports = router;
