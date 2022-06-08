var { Formulario, Grupo, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {

    count: async (req, res) => {
        // count conta por estado_id
        // Para contar todos os pedidos, nao passes estado na query
        const estadoId = req.query.estado_id ?? 0
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
            .then(async () => {
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
                        where: {
                            created_at: {
                                [Op.gte]: sequelize.literal('NOW() - INTERVAL \'' + dias + 'd\'')
                            }
                        }
                    }).then(count => {
                        response.count = count,
                        response.estado = {
                            icon: 'bi-ui-radios',
                            cor: 'primary',
                            descricao: 'Todo'
                        }
                    })
                }
            })
            .then(() => { res.json(response) })
    },

    all: async (req, res) => {
        // para filtrar por estado
        const estadoId = req.query.estado_id ?? 0

        await sequelize.sync()
            .then(async () => {
                // sem filtro por estado_id
                if (estadoId == 0) {
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
                }
                // com filtro por estado_id
                if (estadoId > 0) {
                    await Pedido
                        .findAll({
                            where: {
                                estado_id: estadoId
                            },
                            include: [
                                { model: Cliente },
                                { model: EstadoPedido },
                                { model: MotivoRecusa },
                                { model: Resposta }
                            ],
                            order: [['id', 'ASC']]
                        })
                        .then(response => res.send(response))
                }

            })
    },

    all_estados: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await EstadoPedido.findAll().then(response => {
                    res.send(response)
                })
            })
    },

    new: async (req, res) => {
        const bodyPedido = req.body.pedido
        const bodyRespostas = req.body.pedido.respostas ?? []
        const bodyCliente = req.body.cliente

        if (bodyPedido == undefined ||
            bodyPedido == null ||
            Object.keys(bodyPedido).length === 0 ||
            bodyRespostas.length === 0 ||
            bodyCliente == undefined ||
            bodyCliente == null ||
            Object.keys(bodyCliente).length === 0) {

            throw new Error('\x1b[31m\nAlgum dado não foi inserido. \nO body deve ser constituido por 2 objectos: pedido e cliente.\nO pedido deve ter uma array "respostas" com mais de um item.\x1b[0m')
        }

        await sequelize.sync()
            .then(async () => {
                // ver se o cliente já existe através do email
                await Cliente.findOne({
                    where: {
                        email: bodyCliente.email
                    }
                })
                    .then(async cliente => {

                        if (cliente !== null) {
                            // Se o cliente já existe
                            await Pedido
                                .create({
                                    valor_total: bodyPedido.valor_total,
                                    estado_id: 1,
                                    cliente_id: cliente.id
                                })
                                .then(async pedido => {
                                    await Pedido
                                        .findOne({
                                            where: { id: pedido.id },
                                            include: [
                                                { model: Cliente },
                                                { model: EstadoPedido },
                                                { model: MotivoRecusa },
                                                { model: Resposta }
                                            ]
                                        })
                                        .then(response => res.status(200).json(response))
                                })

                        } else {
                            // Se é um cliente novo
                            await Pedido
                                .create({
                                    valor_total: bodyPedido.valor_total,
                                    estado_id: 1,
                                    cliente: {
                                        nome: bodyCliente.nome,
                                        email: bodyCliente.email,
                                        empresa: bodyCliente.empresa ?? null,
                                        tlm: bodyCliente.tlm ?? null
                                    }
                                }, {
                                    include: [Cliente]
                                })
                                .then(async pedido => {
                                    await Pedido
                                        .findOne({
                                            where: { id: pedido.id },
                                            include: [
                                                { model: Cliente },
                                                { model: EstadoPedido },
                                                { model: MotivoRecusa },
                                                { model: Resposta }
                                            ]
                                        })
                                        .then(response => res.status(200).json(response))
                                })

                        }

                    })
            })

    },
}