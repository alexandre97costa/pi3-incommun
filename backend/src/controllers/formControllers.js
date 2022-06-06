var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");

module.exports = {

    all_form_names: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await Formulario.findAll({
                    order: [['id', 'ASC']]
                })
                    .then(forms => res.json(forms))
            })
    },

    all: async (req, res) => {
        const response = {}

        await sequelize.sync()
            .then(async () => {
                response.formularios = await Formulario
                    .findAll({
                        include: [{
                            model: Grupo,
                            attributes: ['id', 'titulo'],
                            include: [{
                                model: Pergunta,
                                attributes: ['id', 'titulo', 'descricao', 'tipo_id'],
                                include: [{
                                    model: TipoPergunta,
                                    as: 'tipo_pergunta',
                                    attributes: ['id', 'titulo']
                                }]
                            }]
                        }],
                        order: [
                            ['id', 'ASC'],
                            [Grupo, 'id', 'ASC'],
                            [Grupo, Pergunta, 'id', 'ASC'],
                            [Grupo, Pergunta, TipoPergunta, 'id', 'ASC']
                        ]
                    })
            })
            .then(() => { res.send(response) })
    },

    // Devolver os valores para se poderem usar na Backoffice

    all_backoffice: async (req, res) => {
        const response = {}

        await sequelize.sync()
            .then(async () => {
                response.formularios = await Formulario
                    .findAll({
                        include: [{
                            model: Grupo,
                            attributes: ['id', 'titulo'],
                            include: [{
                                model: Pergunta,
                                attributes: ['id', 'titulo', 'descricao', 'tipo_id', 'valor_unitario'],
                                include: [{
                                    model: TipoPergunta,
                                    as: 'tipo_pergunta',
                                    attributes: ['id', 'titulo']
                                }]
                            }]
                        }],
                        order: [
                            ['id', 'ASC'],
                            [Grupo, 'id', 'ASC'],
                            [Grupo, Pergunta, 'id', 'ASC'],
                            [Grupo, Pergunta, TipoPergunta, 'id', 'ASC']
                        ]
                    })
            })
            .then(() => { res.send(response) })
    },

    one: async (req, res) => {

        const id = req.query.id
        if (id == undefined) {
            throw new Error('id undefined!!')
            return
        }

        await sequelize.sync()
            .then(async () => {
                await Formulario
                    .findOne({
                        where: {
                            id: id
                        },
                        include: [{
                            model: Grupo,
                            attributes: ['id', 'titulo'],
                            include: [{
                                model: Pergunta,
                                // Não se inclui o attr valor_unitario para que não esteja 
                                // acessivel de maneira nenhuma no lado do cliente
                                attributes: ['id', 'titulo', 'descricao', 'tipo_id'],
                                include: [{
                                    model: TipoPergunta,
                                    as: 'tipo_pergunta',
                                    attributes: ['id', 'titulo']
                                }]
                            }]
                        }],
                        order: [
                            [Grupo, 'id', 'ASC'],
                            [Grupo, Pergunta, 'id', 'ASC'],
                            [Grupo, Pergunta, TipoPergunta, 'id', 'ASC']
                        ]
                    })
                    .then(formulario => {
                        console.log('\x1b[36m/forms/one \x1b[0m' + formulario.titulo)
                        res.send(formulario)
                    })
            })
    },
}