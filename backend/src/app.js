const express = require('express')
const path = require('path');
const cors = require('cors')
const app = express()
app.set('port', process.env.PORT || 4011)


const formsRoutes = require('./routes/formsRoutes.js')
const pedidosRoutes = require('./routes/pedidosRoutes.js')
const clientesRoutes = require('./routes/clientesRoutes.js')
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

// rota de introdução
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(app.get('port'), () => {
    console.log('Server online!')
})