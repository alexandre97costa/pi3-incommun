const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var { Formulario, Grupo, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole } = require('../model/tabelas')
const sequelize = require('../model/db');
const config = require('../config');

module.exports = {


    list: async (req, res) => {
        await sequelize.sync()
            .then(async () => {

                await UserIncommun
                    .findAll()
                    .then(data => { res.json({ success: true, data }) })
                    .catch(error => { return error })
            })

    },
    register: async (req, res) => {
        const { name, email, password } = req.body;
        const data = await UserIncommun.create({
            name: name,
            email: email,
            password: password
        })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log("Erro: " + error);
                return error;
            })
        res.status(200).json({
            success: true,
            message: "Registado",
            data: data
        });
    },
    login: async (req, res) => {
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
        }
        var user = await UserIncommun.findOne({ where: { email: email } })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log("Erro: " + error);
                return error;
            })
        if (password === null || typeof password === "undefined") {
            res.status(403).json({
                success: false,
                message: 'Campos em Branco'
            });
        } else {
            if (req.body.email && req.body.password && user) {
                const isMatch = bcrypt.compareSync(password, user.password);
                if (req.body.email === user.email && isMatch) {
                    let token = jwt.sign({ email: req.body.email }, config.secret, { expiresIn: '1h' });
                    
                    res.json({ success: true, message: 'Autenticação realizada com sucesso!', token: token });
                } else {
                    res.status(403).json({ success: false, message: 'Dados de autenticação inválidos.' });
                }
            } else {
                res.status(400).json({ success: false, message: 'Erro no processo de autenticação. Tente de novo mais tarde.' });
            }
        }
    }
}

