const express = require('express');
const router = express.Router();
const jwt_middleware = require('../jwt_middleware');
const graphControllers = require('../controllers/graphControllers')

router.get('/test', jwt_middleware.checkToken, graphControllers.test);
router.get('/visitas/dia', jwt_middleware.checkToken, graphControllers.visitas_dia);
router.get('/visitas/semana', jwt_middleware.checkToken, graphControllers.visitas_semana);
router.get('/pedidos/dia', jwt_middleware.checkToken, graphControllers.pedidos_dia);
router.get('/pedidos/semana', jwt_middleware.checkToken, graphControllers.pedidos_semana);

module.exports = router;