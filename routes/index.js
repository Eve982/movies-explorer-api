const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../middlewares/swagger');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not_found_error');
const { createUser, login, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validatiors');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.post('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('urlNotFound', req));
});
module.exports = router;
