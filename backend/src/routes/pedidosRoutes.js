const express = require('express');
const router = express.Router();
const jwt_middleware = require('../jwt_middleware')
const pedidosController = require('../controllers/pedidosControllers')


router.get('/', (req, res) => {
    res.send('estás dentro de /pedidos/')
})


router.get('/count', jwt_middleware.checkToken, pedidosController.count)
router.get('/all', jwt_middleware.checkToken, pedidosController.all)
router.get('/all_estados', jwt_middleware.checkToken, pedidosController.all_estados)
router.get('/all_motivos', jwt_middleware.checkToken, pedidosController.all_motivos)
router.put('/update_estado', jwt_middleware.checkToken, pedidosController.update_estado)

router.post('/new', pedidosController.new)

module.exports = router;