var { Formulario, Grupo, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");

sequelize.sync()

module.exports = {

    count: async (req, res) => {
        const estadoId = req.query.estado
        if (estadoId === undefined) { throw new Error('query.estado veio undefined!') }

        const response = {}

        await sequelize.sync()
            .then(async () => {
                await EstadoPedido
                    .findOne({
                        where: { id: estadoId }
                    })
                    .then(res => { response.estado = res })
            })
            .then(async (estado) => {
                await Pedido
                    .count({
                        where: {
                            estado_id: estadoId
                        }
                    })
                    .then(count => { response.count = count })
            })
            .then(() => { res.json(response) })
    },

    all: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await Pedido.findAll({
                    include: [
                        { model: Cliente },
                        { model: EstadoPedido },
                        { model: MotivoRecusa },
                        { model: Resposta }
                    ],
                    order: [['id', 'ASC']]
                })
                    .then(response => res.send(response))
            })
    }
}