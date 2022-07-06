var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");

module.exports = {
    
    test: async (req, res) => {
        res.send('graph/test success')
    },

    /* 
        *| Todos os controllers deste ficheiro devolvem      
        *| uma array de resultados, para serem aproveitados  
        *| por um gráfico de qualquer tipo (line, pie, etc)  

        Mesmo assim, é de lembrar que a info precisa de ser tratada
        quando chegar ao frontend, para chegar do formato que o 
        gráfico pretende (matrix transposing). Essa formatação 
        só é feita no frontend para conseguirmos juntar informação 
        de vários controllers no mesmo gráfico.

        ! Explicação das variaveis
        formulario_id    -> Filtra os resultados por formulario
                            =5 só visitas a Gestão de Redes Sociais
                            =0 sem filtro de formulário
        stack            -> Quantas camadas devolve 
                            =3 devolve 3 dias de resultados em visitas_dia
                            =4 devolve 4 semanas em visitas_semana
                            =0 devolve nada; resposta vazia. 
        offset_dias      -> Desvia a data de inicio de contagem.
                            =0 equivale a ontem, 
                            =-1 equivale a hoje
                            =3 equivale à data de há 4 dias atrás
        offset_semanas   -> O mesmo que offset_dias, mas desvia x7                            
    */

    visitas_dia: async (req, res) => {
        
    },

    visitas_semana: async (req, res) => {

    },

    pedidos_dia: async (req, res) => {

    },

    pedidos_semana: async (req, res) => {

    },

}