const express = require('express');
const router = express.Router();
const pedidos_clienteController = require('../controllers/pedidos_clienteController')


router.get('/', (req, res) => {
    res.send('estás dentro de /pedidos_cliente/')
})


router.get('/list', pedidos_clienteController.list)



module.exports = router;