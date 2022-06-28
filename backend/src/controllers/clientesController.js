const nodemailer = require('nodemailer')
require('dotenv').config()
var { Formulario, GrupoPerguntas, Pergunta, Resposta, Pedido, Cliente } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");
const controllers = {}

controllers.enviar_email = async (req, res) => {
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
}


controllers.list = async (req, res) => {
    // para filtrar por estado
    const filtro = req.query.filtro ?? 0

    await sequelize.sync()
        .then(async () => {
            // sem filtro por estado_id
            if (filtro == 0) {
                const data = await Cliente.findAll({
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
                const data = await Cliente.findAll({
                    order: [
                        ['nome', 'ASC']
                    ],
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
                const data = await Cliente.findAll({
                    order: [
                        ['nome', 'DESC']
                    ],
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
                const data = await Cliente.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
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
                const data = await Cliente.findAll({
                    order: [
                        ['created_at', 'ASC']
                    ],
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


    controllers.total = async (req, res) => {
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

module.exports = controllers;