const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController')


router.get('/', (req, res) => {
    res.send('estás dentro de /pedidos/')
})


router.get('/all', pedidosController.all)
router.get('/all_estados', pedidosController.all_estados)
router.get('/count', pedidosController.count)

router.post('/new', pedidosController.new)

module.exports = router;