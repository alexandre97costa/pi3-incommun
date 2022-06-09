const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
require('dotenv').config()


router.post('/', async (req, res) => {
    const text = req.body.text

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "910a67115889c3",
            pass: "cb580f8b54a229"
        }
    });

    await transport.sendMail({
        from: "alexandre@tarantula.com",
        to: "cliente@gmail.com",
        cc: "admin@incommun.com",
        subject: "SUBJECT EMAIL YOOOOOOOOOO",
        html: `<div 
                    className="email"
                    style="
                        border:1px solid black;
                        padding:20px;
                        font-family:sans-serif;
                        line-height:2;
                        font-size:20px;"
                >
                    <h2>FUNCIONOU CARALHOOOOO!</h2>
                    <p>${text}</p>
                </div>`
    })

    res.send('Email enviado!')

})


module.exports = router;