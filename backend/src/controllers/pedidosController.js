var { Formulario, Grupo, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");

sequelize.sync()

module.exports = {

    count: async (req, res) => {
        // count conta por estado_id
        // Para contar todos os pedidos, nao passes estado na query
        const estadoId = req.query.estado ?? 0
        // filtra por dias de idade (conta pedidos com até 30 dias de idade por exemplo)
        const dias = req.query.dias ?? 30

        const response = {}

        await sequelize.sync()
            .then(async () => {
                if (estadoId > 0) {
                    await EstadoPedido
                        .findOne({
                            where: { id: estadoId }
                        })
                        .then(res => { response.estado = res })
                }
            })
            .then(async (estado) => {
                if (estadoId > 0) {
                    await Pedido
                        .count({
                            where: {
                                estado_id: estadoId
                            }
                        })
                        .then(count => { response.count = count })
                }
                if (estadoId === 0) {
                    await Pedido.count({
                        where : {
                            created_at: {
                                [Op.gte]: sequelize.literal('NOW() - INTERVAL \'' + dias + 'd\'')
                            }
                        }
                    }).then(count => {
                        response.count = count
                    })
                }
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
    },

    all_estados: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await EstadoPedido.findAll().then(response => {
                    res.send(response)
                })
            })
    }
}