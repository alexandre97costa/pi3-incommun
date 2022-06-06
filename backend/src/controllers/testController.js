var { Formulario, GrupoPerguntas, Pergunta, Resposta, Pedido, Cliente } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {
    post_pedido: async (req, res) => {
        const body = req.body
        console.log(body)
        res.send('bleh')

        
    }
}
