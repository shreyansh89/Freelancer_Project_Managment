const express = require('express');
const usercontroller = require('../controllers/userController');
const router = express.Router();

router.post('/signup', usercontroller.signup);
router.post('/login', usercontroller.login);

module.exports = router;
