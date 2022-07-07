var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");

module.exports = {

    test: async (req, res) => {
        res.send('graph/test success')
    },

    /* 
        * Todos os controllers deste ficheiro devolvem      
        * uma array de resultados, para serem aproveitados  
        * por um gráfico de qualquer tipo (line, pie, etc)  

        Mesmo assim, é de lembrar que a info precisa de ser tratada
        quando chegar ao frontend, para chegar do formato que o 
        gráfico pretende (matrix transposing). Essa formatação 
        só é feita no frontend para conseguirmos juntar informação 
        de vários controllers no mesmo gráfico.

        ? Explicação das variáveis
        form_id          -> Filtra os resultados por formulario
                            =5 só visitas a Gestão de Redes Sociais
                            =0 sem filtro de formulário
        stack            -> Quantas camadas devolve 
                            =3 devolve 3 dias de resultados em visitas_dia
                            =4 devolve 4 semanas em visitas_semana
                            =0 devolve nada; resposta vazia. 
        offset_dias      -> Desvia a data de inicio de contagem.
                            =0 equivale a hoje, 
                            =-1 equivale a amanhã
                            =3 equivale à data de há 3 dias atrás
        offset_semanas   -> O mesmo que offset_dias, mas desvia x7
        timezone_shift   -> Compensação pela timezone, constante                    
    */

    visitas_dia: async (req, res) => {
        const form_id = parseInt(req.query.form_id ?? 0)
        const stack = parseInt(req.query.stack ?? 1)
        const offset_dias = parseInt(req.query.offset_dias ?? 0)
        const offset_semanas = 7 * parseInt(req.query.offset_semanas ?? 0)

        const timezone_shift = !!1 ? new Date().getTimezoneOffset() : 0
        const iteracoes = 24 //24 horas nué

        await sequelize.sync().then(async () => {

            let matrix = await Promise.all([...Array(stack)].map(async (stack, s) => {
                return await Promise.all([...Array(iteracoes)].map(async (iteracao, i) => {

                    let inicio = new Date()
                    inicio.setHours(1 + i, timezone_shift, 0, 0)
                    inicio.setDate(inicio.getDate() - s - offset_dias - offset_semanas)

                    let fim = new Date()
                    fim.setHours(1 + i, 59 + timezone_shift, 59, 999)
                    fim.setDate(fim.getDate() - s - offset_dias - offset_semanas)

                    // console.log(inicio.toISOString(), fim.toISOString())

                    return await Visita
                        .count({
                            where: {
                                form_id:
                                    !!form_id ?
                                        form_id :
                                        { [Op.ne]: form_id },
                                created_at:
                                    { [Op.between]: [inicio.toISOString(), fim.toISOString()] }

                            }
                        })
                        .then(c => c)
                        .catch(console.error)
                }))
            }))

            res.json({ matrix })
        })
    },

    visitas_semana: async (req, res) => {
        const form_id = parseInt(req.query.form_id ?? 0)
        const stack = parseInt(req.query.stack ?? 1)
        const offset_dias = 24 * parseInt(req.query.offset_dias ?? 0)
        const offset_semanas = 24 * 7 * parseInt(req.query.offset_semanas ?? 0)

        const timezone_shift = !!1 ? new Date().getTimezoneOffset() : 0
        const iteracoes = 7 // 7 dias numa semana, nué

        await sequelize.sync().then(async () => {

            let matrix = await Promise.all([...Array(stack)].map(async (stack, s) => {
                return await Promise.all([...Array(iteracoes)].map(async (iteracao, i) => {

                    let inicio = new Date()
                    inicio.setHours(1, timezone_shift, 0, 0)
                    inicio.setDate(inicio.getDate() - 6 + i - (s * 7) - offset_dias - offset_semanas)

                    let fim = new Date()
                    fim.setHours(24, 59 + timezone_shift, 59, 999)
                    fim.setDate(fim.getDate() - 6 + i - (s * 7) - offset_dias - offset_semanas)

                    // console.log(inicio.toISOString() + ' ' + fim.toISOString())

                    return await Visita
                        .count({
                            where: {
                                form_id:
                                    !!form_id ?
                                        form_id :
                                        { [Op.ne]: form_id },
                                created_at:
                                    { [Op.between]: [inicio.toISOString(), fim.toISOString()] }

                            }
                        })
                        .then(c => c)
                        .catch(console.error)
                }))
            }))

            res.json({ matrix })
        })
    },

    pedidos_dia: async (req, res) => {
        const form_id = parseInt(req.query.form_id ?? 0)
        const stack = parseInt(req.query.stack ?? 1)
        const offset_dias = parseInt(req.query.offset_dias ?? 0)
        const offset_semanas = 7 * parseInt(req.query.offset_semanas ?? 0)

        const timezone_shift = !!1 ? new Date().getTimezoneOffset() : 0
        const iteracoes = 24 //24 horas nué

        await sequelize.sync().then(async () => {

            let matrix = await Promise.all([...Array(stack)].map(async (stack, s) => {
                return await Promise.all([...Array(iteracoes)].map(async (iteracao, i) => {

                    let inicio = new Date()
                    inicio.setHours(1 + i, timezone_shift, 0, 0)
                    inicio.setDate(inicio.getDate() - s - offset_dias - offset_semanas)

                    let fim = new Date()
                    fim.setHours(1 + i, 59 + timezone_shift, 59, 999)
                    fim.setDate(fim.getDate() - s - offset_dias - offset_semanas)

                    // console.log(inicio.toISOString() + ' ' + fim.toISOString())

                    // TODO filtrar o form_id
                    return await Pedido
                        .count({
                            where: {
                                created_at:
                                    { [Op.between]: [inicio.toISOString(), fim.toISOString()] }

                            }
                        })
                        .then(c => c)
                        .catch(console.error)
                }))
            }))

            res.json({ matrix })
        })
    },

    pedidos_semana: async (req, res) => {
        const form_id = parseInt(req.query.form_id ?? 0)
        const stack = parseInt(req.query.stack ?? 1)
        const offset_dias = 24 * parseInt(req.query.offset_dias ?? 0)
        const offset_semanas = 24 * 7 * parseInt(req.query.offset_semanas ?? 0)

        const timezone_shift = !!1 ? new Date().getTimezoneOffset() : 0
        const iteracoes = 7 // 7 dias numa semana, nué

        await sequelize.sync().then(async () => {

            let matrix = await Promise.all([...Array(stack)].map(async (stack, s) => {
                return await Promise.all([...Array(iteracoes)].map(async (iteracao, i) => {

                    let inicio = new Date()
                    inicio.setHours(1, timezone_shift, 0, 0)
                    inicio.setDate(inicio.getDate() - 6 + i - offset_dias - offset_semanas)

                    let fim = new Date()
                    fim.setHours(24, 59 + timezone_shift, 59, 999)
                    fim.setDate(fim.getDate() - 6 + i - offset_dias - offset_semanas)

                    // console.log(inicio.toISOString() + ' ' + fim.toISOString())

                    // TODO filtrar o form_id
                    return await Pedido
                        .count({
                            where: {
                                created_at:
                                    { [Op.between]: [inicio.toISOString(), fim.toISOString()] }

                            }
                        })
                        .then(c => c)
                        .catch(console.error)
                }))
            }))

            res.json({ matrix })
        })
    },

}