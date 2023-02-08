const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinValidator, signupValidator } = require('../validators/authValidators');

router.use('/signin', signinValidator, login);
router.use('/signup', signupValidator, createUser);
router.use(auth);
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use('/signout', logout);

module.exports = router;
