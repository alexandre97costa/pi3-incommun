const express = require('express')
const path = require('path');
const cors = require('cors')
const jwt_middleware = require('./jwt_middleware')
const app = express()
app.set('port', process.env.PORT || 4011)


const formsRoutes = require('./routes/formsRoutes.js')
const pedidosRoutes = require('./routes/pedidosRoutes.js')
const clientesRoutes = require('./routes/clientesRoutes.js')
const graphRoutes = require('./routes/graphRoutes.js')

// user incommun, não confundir com clientes
const userRoutes = require('./routes/userRoutes.js')

//* Middlewares
app.use(cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log('\x1b[37m\x1b[42m ' + req.method + ' \x1b[0m ' + req.url);
    next()
});

//* Rotas
app.use('/forms', formsRoutes)
app.use('/pedidos', pedidosRoutes)
app.use('/clientes', jwt_middleware.checkToken, clientesRoutes)
app.use('/user', userRoutes)
app.use('/graph', jwt_middleware.checkToken, graphRoutes)

// rota de introdução, apresenta um html bonitinho só
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(app.get('port'), () => {
    console.log('Server online!')
})