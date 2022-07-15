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

    // ADICIONAR
    add: async (req, res) => {
        const { titulo, descricao, tipo_pergunta, valor_unitario, grupo_id } = req.body;

        console.log(req.body)
        const data = await Pergunta.create(

            {
                titulo: titulo,
                descricao: descricao,
                tipo_id: tipo_pergunta,
                valor_unitario: valor_unitario,
                grupo_id: grupo_id,


            },
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
            message: "Nova Pergunta adicionada com sucesso"
        });
    },

    delete: async (req, res) => {
        const { id } = req.body;

        console.log(req.body)
        const data = await Pergunta.destroy({ 
            
            where: {
                 id: id },
            
            force: true
 }
        )

    res.json({
        success: true,
        data: data,
        message: "Removido com sucesso"
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
        // check para nao partir o codigo todo
        if (!(
            req.query.vista == 'dia' ||
            req.query.vista == 'semana' ||
            req.query.vista == 'total' ||
            typeof req.query.vista === undefined
        )) {
            res.status(400).json({ success: false, vista: req.query.vista, msg: '"vista" está mal. Pode ser dia, semana, total, ou não passar este parametro simplesmente' })
        }


        // se for 0, conta todas as visitas a formulários
        const formulario_id = parseInt(req.query.formulario_id ?? 0)

        // A vista pode ser "dia", "semana" ou "total"
        // Se for dia:      separa as visitas por hora 
        // Se for semana:   separa as visitas por dia
        // Se for total:    não separa, conta todas as visitas (por formulário)
        const vista = req.query.vista ?? "total"

        // O stack serve para comparar várias unidades de tempo
        // Só serve para vista = dia|semana
        // Se vista=dia e stack=3     -> devolve 3 arrays, para os 3 dias anteriores a hoje (ontem, anteontem, etc)
        // Se vista=semana e stack=2  -> devolve 2 arrays, para as 2 semanas anteriores a *hoje*
        const stack = parseInt(req.query.stack ?? 1)

        // * Sem offsets, este controller conta
        // * a começar na ultima meia-noite (00h00), ou seja *ontem*

        // O offset serve para a contagem começar mais atrás
        // Se offset_dias=3     -> começa a contar a partir de há 3 dias atrás 
        // Se offset_semanas=4  -> começa a contar a partir de há um mês atrás
        // offset_dias e offset_semanas podem-se usar ao mesmo tempo
        const offset_dias = 24 * parseInt(req.query.offset_dias ?? 0)
        const offset_semanas = 24 * 7 * parseInt(req.query.offset_semanas ?? 0)

        const timezone_shift = new Date().getTimezoneOffset()

        await sequelize.sync()
            .then(async () => {

                let contagem = []
                let inicio;
                let fim;
                const semana_multiplier = 24 * (vista === 'semana' ? 7 : 1) - (vista === 'semana' ? 23 : 1)

                for (let j = 0; j < stack; j++) {
                    let linha = []
                    for (let i = 0; i <= semana_multiplier; i = vista === 'semana' ? i + 24 : i + 1) {
                        inicio = new Date()
                        inicio.setHours(i - semana_multiplier - (semana_multiplier * j) - offset_dias - offset_semanas, 0 + timezone_shift, 0, 0)
                        fim = new Date()
                        fim.setHours(i - semana_multiplier - (semana_multiplier * j) - offset_dias - offset_semanas, 59 + timezone_shift, 59, 999)

                        // A logica de cima consegue fazer tudo bem e nsq, so nao consegue meter
                        // as horas como deve ser (das 00h00 às 23h59) quando vista=semana
                        // Entao isto dá override às horas nesse caso especifico
                        if (vista === 'semana') {
                            inicio.setHours(1, 0, 0, 0)
                            fim.setHours(24, 59, 59, 999)
                        }
                        // console.log(inicio, fim)

                        await Visita
                            .count({
                                where: {
                                    form_id:
                                        !!formulario_id ?
                                            formulario_id :
                                            { [Op.ne]: formulario_id },
                                    created_at:
                                        vista !== 'total' ?
                                            { [Op.between]: [inicio.toISOString(), fim.toISOString()] } :
                                            { [Op.lte]: new Date().toISOString() }
                                }
                            })
                            .then(count => {
                                switch (vista) {
                                    case 'total':
                                        res.json(count);
                                        return

                                    // case 'dia': linha.push([i + 'h', count]); break;
                                    case 'dia': linha.push([i + '', count]); break;
                                    case 'semana': linha.push([(7 - (i / 24)) + (7 * j) + 'd', count]); break;

                                    default: break;
                                }

                            })
                            .catch(error => console.log(error))
                    }
                    contagem.push(linha)
                }

                let contagemChart = Array.from(contagem[0], (item, index) => {
                    return [item[0], ...contagem.map(linha => { return linha[index][1] })]
                })


                let header = Array.from(contagemChart[0], (item, index) => {
                    return !!index ? vista + ' ' + index : 'unidade'
                })

                res.json({ contagem: [header, ...contagemChart] })
            })
    },
}