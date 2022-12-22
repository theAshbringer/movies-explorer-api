const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const signinValidator = require('../validators/signin-validator');
const signupValidator = require('../validators/signup-validator');

router.use('/signin', signinValidator, login);
router.use('/signup', signupValidator, createUser);
router.use(auth);
router.use('/cards', require('./movies'));
router.use('/users', require('./users'));

router.use('/logout', logout);

module.exports = router;
