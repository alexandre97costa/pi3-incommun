const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController')


router.post('/post_pedido', testController.post_pedido)

module.exports = router;