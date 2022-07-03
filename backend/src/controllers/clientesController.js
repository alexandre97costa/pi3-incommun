const nodemailer = require('nodemailer')
require('dotenv').config()
var { Formulario, GrupoPerguntas, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");


module.exports = {

    // envia um email ao cliente (ver emails -> https://mailtrap.io/inboxes/1774189/messages)
    enviar_email: async (req, res) => {
        console.log(req.body)
        if (
            !req.body.hasOwnProperty('email_cliente') ||
            !req.body.hasOwnProperty('assunto') ||
            !req.body.hasOwnProperty('titulo') ||
            !req.body.hasOwnProperty('corpo')
        ) {
            res.status(400).send('É necessário: "email_cliente", "assunto", "titulo" e "corpo".')
            return
        }
        const email_cliente = req.body.email_cliente
        const assunto = req.body.assunto
        const titulo = req.body.titulo
        const corpo = req.body.corpo


        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        await transport
            .sendMail({
                from: process.env.MAIL_FROM,
                to: email_cliente,
                cc: process.env.MAIL_CC,
                subject: assunto,
                html: `<div 
                    className="email"
                    style="
                        border:1px solid black;
                        padding:20px;
                        font-family:sans-serif;
                        line-height:2;
                        font-size:20px;"
                >
                    <h2>${titulo}</h2>
                    <p>${corpo}</p>
                </div>`,
                attachments: [
                    {
                        filename: 'vamos_fingir_que_isto_é_um_pedido.pdf',
                        path: __dirname + '/exemplo_de_pedido.pdf'
                    }
                ]
            })
            .catch(error => { res.status(417).send('Erro a enviar email. Verificar consola.'); throw new Error(error) })

        res.status(200).send('Email enviado!')
    },

    // devolve todos os clientes
    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ??  'ASC'

        await sequelize.sync()
            .then(async () => {
               
                    const data = await Cliente.findAll({
                        order: [
                            [filtro,ordem]
                        ]
                    })
                        .then(function (data) {
                            return data;
                        })
                        .catch(error => {
                            return error;
                        });
                    res.json({ success: true, data: data });
                })
    },
    detalhes_pedido: async (req, res) => {
        const id_pedido = req.query.id_pedido ?? 0

        await sequelize.sync()
            .then(async () => {
                await Pedido
                    .findAll({
                        where: { id: id_pedido },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ]
                        
                    })
                    .then(data => { res.status(200).json({ success: true, data: data }) })
                    .catch(error => { res.status(400); throw new Error(error); });

            })
    },
    // devolve todos os pedidos de um determinado cliente
    list_pedidos: async (req, res) => {
        const cliente = req.query.cliente ?? 0
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Pedido
                    .findAll({
                        where: { cliente_id: cliente },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            { model: Resposta }
                        ],
                        order: [[filtro, ordem]]
                    })
                    .then(data => { res.status(200).json({ success: true, data: data }) })
                    .catch(error => { res.status(400); throw new Error(error); });

            })
    },

    // devolve o numero de clientes na BD
    total: async (req, res) => {
        const data = await Cliente.count({
        })
            .then(function (data) {
                return data;
            })
            .catch(error => {
                return error;
            });
        res.json({ success: true, data: data });
    }
}