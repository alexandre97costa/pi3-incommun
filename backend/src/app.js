const express = require('express')
const cors = require('cors')
const app = express()
app.set('port', process.env.PORT || 4011)


const formsRoutes = require('./routes/formsRoutes.js')
const pedidosRoutes = require('./routes/pedidosRoutes.js')
const clientesRoutes = require('./routes/clientesRoutes.js')
const testRoutes = require('./routes/testRoutes.js')
const emailRoutes = require('./routes/emailRoutes.js')

// teste
//* Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('\x1b[37m\x1b[42m ' + req.method + ' \x1b[0m ' + req.url);
    next()
});

//* Rotas
app.use('/forms', formsRoutes)
app.use('/pedidos', pedidosRoutes)
app.use('/clientes', clientesRoutes)
app.use('/email', emailRoutes)
app.use('/test', testRoutes)

// rota de introdução
app.use('/', (req, res) => {
    res.json({
        success: false,
        intro: 'Olá! 👋 Isto é o ponto de entrada do nosso backend. Tira os sapatos antes de entrar 🧐',
        rotas: {
            forms: [
                'GET /forms/all',
                'GET /forms/all_form_names',
                'GET /forms/one?id=1',
            ],
            pedidos: [
                'GET /pedidos/all?id=0',
                'GET /pedidos/all_estados',
                'GET /pedidos/count?id=0&dias=30',
            ],

        }
    });
});


app.listen(app.get('port'), () => {
    console.log('Server online! http://localhost:' + app.get('port'))
})