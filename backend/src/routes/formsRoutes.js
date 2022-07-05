const express = require('express');
const router = express.Router();
const jwt_middleware = require('../jwt_middleware')
const formController = require('../controllers/formControllers')


router.get('/', (req, res) => {
    res.send('estás dentro de /form/')
})


router.get('/all_form_names', formController.all_form_names)
router.get('/all', formController.all) // Eu acho que esta já não é necessária
router.get('/all_backoffice', jwt_middleware.checkToken, formController.all_backoffice)
router.put('/edit', jwt_middleware.checkToken, formController.edit)
router.get('/all_tipos_pergunta', jwt_middleware.checkToken, formController.all_tipos_pergunta)
router.get('/one', formController.one)
router.get('/count_visitas', jwt_middleware.checkToken, formController.count_visitas)

module.exports = router;

