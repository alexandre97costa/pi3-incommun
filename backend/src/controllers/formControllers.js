var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
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

    // DEVOLVER VALORES PARA DROPDOWN DO TIPO DE PERGUNTAS EM FORMULÁRIO

    all_tipos_pergunta: async (req, res) => {
        const data = await TipoPergunta.findAll({
            order: [['id', 'ASC']]
        });
        res.json({ success: true, data: data })
    },


    //EDITAR
    edit: async (req, res) => {
        const { id, titulo, descricao, tipo_pergunta, valor_unitario } = req.body;

        console.log(req.body)
        const data = await Pergunta.update(

            {
                titulo: titulo,
                descricao: descricao,
                tipo_id: tipo_pergunta,
                valor_unitario: valor_unitario


            },
            { where: { id: id } }
        )
            .then(function (data) {
                return data;
            })
            .catch(error => {
                return error;
            })

        res.json({
            success: true,
            data: data,
            message: "Atualizado com sucesso"
        });
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
                        where: { id: id },
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
                    .then(async (formulario) => {
                        // Sempre que este formulário é requerido,
                        // é lhe acrescentada uma visita
                        await Visita
                            .create({ form_id: formulario.id })
                            .then(() => {
                                console.log('\x1b[36m[visita] \x1b[0m' + formulario.titulo)
                                res.send(formulario)
                            })
                    })
            })
    },

    count_visitas: async (req, res) => {
        // se for 0, conta todas as visitas a formulários
        const formulario_id = parseInt(req.query.formulario_id ?? 0)

        await sequelize.sync()
            .then(async () => {
                if (formulario_id === 0) {
                    await Visita
                        .count()
                        .then(totalVisitas => {
                            res.json({ coise: totalVisitas })
                            console.log('totalVisitas', totalVisitas)
                        })
                        .catch(error => console.log(error))
                } else {
                    await Visita
                        .count({ where: { form_id: formulario_id } })
                        .then(totalVisitas => {
                            res.json({ coise: totalVisitas })
                            console.log('visitas por id:', totalVisitas)
                        })
                        .catch(error => console.log(error))
                }
            })
    },
}