const router = require('express').Router();
const {
  updateProfile, getProfile,
} = require('../controllers/users');
const { profileValidator } = require('../validators/users');

router.get('/me', getProfile);

router.patch('/me', profileValidator, updateProfile);

module.exports = router;
