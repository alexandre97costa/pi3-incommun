const express = require('express');
const router = express.Router();
const middleware = require('../jwt_middleware');
const userControllers = require('../controllers/userControllers')

router.get('/list', middleware.checkToken, userControllers.list);
router.post('/register',userControllers.register);
router.post('/login',userControllers.login);

module.exports = router;