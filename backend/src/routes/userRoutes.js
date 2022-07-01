const express = require('express');
const router = express.Router();
const jwt_middleware = require('../jwt_middleware');
const userControllers = require('../controllers/userControllers')

// router.get('/list', jwt_middleware.checkToken, userControllers.list);
router.get('/list', jwt_middleware.checkToken, userControllers.list);
router.post('/register', jwt_middleware.checkToken, userControllers.register);
router.post('/login',userControllers.login);

module.exports = router;