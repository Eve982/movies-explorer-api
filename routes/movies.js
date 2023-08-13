const router = require('express').Router();
const { validateCreateMovie, validateMovieId } = require('../middlewares/validatiors');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.post('/', validateCreateMovie, createMovie);
router.get('/saved-movies', getMovies);
router.delete('/saved-movies/:movieId', validateMovieId, deleteMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
