const express = require('express');
const router = express.Router();
const middleware = require('../middleware');


//importar os controladores
const userController = require('../controllers/userController')
router.get('/list', middleware.checkToken, userController.list);
router.post('/register',userController.register);
router.post('/login',userController.login);
module.exports = router;
