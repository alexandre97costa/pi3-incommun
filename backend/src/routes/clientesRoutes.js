
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController')


router.get('/', (req, res) => {
    res.send('estás dentro de /clientes/')
})

router.get('/list', clientesController.list)
router.get('/list_pedidos', clientesController.list_pedidos)
router.get('/total', clientesController.total)
router.get('/count', clientesController.count)
router.post('/enviar_email', clientesController.enviar_email)

module.exports = router;