var { Formulario, Grupo, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {

    list: async (req, res) => {
        const cliente = req.query.cliente ?? 0
        const filtro = req.query.filtro ?? 0

        await sequelize.sync()
            .then(async () => {
                if (filtro == 0) {
                    const data = await Pedido.findAll({
                        where: {
                            cliente_id: cliente
                        },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ],
                        order: [['id', 'ASC']]
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
                }
                if (filtro == 1) {
                    await Pedido.findAll({
                        where: {
                            cliente_id: cliente
                        },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ],
                        order: [['valor_total', 'DESC']]
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
                }
                if (filtro == 2) {
                    await Pedido.findAll({
                        where: {
                            cliente_id: cliente
                        },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ],
                        order: [['valor_total', 'ASC']]
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
                }
                if (filtro == 3) {
                    await Pedido.findAll({
                        where: {
                            cliente_id: cliente
                        },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ],
                        order: [['createdAt', 'ASC']]
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
                }
                if (filtro == 4) {
                    await Pedido.findAll({
                        where: {
                            cliente_id: cliente
                        },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ],
                        order: [['createdAt', 'DESC']]
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
                }
            })   

            
    },


   

}