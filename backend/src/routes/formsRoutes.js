const express = require('express');
const router = express.Router();
const formController = require('../controllers/formControllers')


router.get('/', (req, res) => {
    res.send('estás dentro de /form/')
})


router.get('/all_form_names', formController.all_form_names)
router.get('/all', formController.all)
router.get('/all_backoffice', formController.all_backoffice)
router.get('/get/:id', formController.buscar);
router.post('/edit/:id', formController.edit)
router.get('/all_tipos_pergunta', formController.all_tipos_pergunta)
router.get('/one', formController.one)





/*
router.get('/testdata',filmeController.testdata );
router.get('/list',filmeController.filme_list );
router.get('/get/:id', filmeController.filme_detail);
router.get('/get_all_generos', filmeController.genero_list);
router.post('/create', filmeController.filme_create);
router.put('/update/:id', filmeController.filme_update);
*/

module.exports = router;

