const router = require('express').Router();
const {  createMovie, getMovies, deleteMovie} = require('../controllers/movies');
const { movieIdValidator, movieDataValidator } = require('../validators/cards');

router.get('/', getMovies);

router.post('/', movieDataValidator, createMovie);

router.delete('/:id', movieIdValidator, deleteMovie);

module.exports = router;
