const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const validateToken = require('../middleware/ValidateToken');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/current', validateToken, userController.currentUser);

module.exports = router;