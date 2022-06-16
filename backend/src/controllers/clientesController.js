var { Formulario, GrupoPerguntas, Pergunta, Resposta, Pedido, Cliente } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");
sequelize.sync()
const controllers = {}
controllers.list = async (req, res) => {
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
controllers.listAZ = async (req, res) => {
    const data = await Cliente.findAll({
        order:[
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
controllers.listZA = async (req, res) => {
    const data = await Cliente.findAll({
        order:[
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

    
    /*
    all: async (req, res) => {
        const response = {}

        await sequelize.sync()
            .then(async () => {
                response.formularios = await Formulario
                    .findAll({
                        include: [{
                            model: GrupoPerguntas,
                            attributes: ['titulo'],
                            include: [{
                                model: Pergunta,
                                attributes: ['texto', 'descricao', 'tipo', 'preco']
                            }]
                        }],
                        order: [[GrupoPerguntas, Pergunta, 'id', 'ASC']]
                    })
            })
            .then(() => { res.send(response) })
    },
    */

    /*
    all: async (req, res) => {
        await sequelize.sync()
        .then(async () => {
            await Cliente.findAll({
                include: [{
                    model: Pedido,
                    attributes: ['id', 'valor'],
                    include: [{
                        model: Resposta,
                        // attributes: []
                    }]
                }],
                order: [['id', 'ASC']]
            })
            .then(response => res.send(response))
        })
    }
    */


    /*

    // * retirado das rotas
    testdata: async (req, res) => {
        const response = await sequelize.sync()
            .then(async function () {

                const genero1 = await Genero.findByPk(Math.ceil(Math.random() * 15))
                const genero2 = await Genero.findByPk(Math.ceil(Math.random() * 15))
                const genero3 = await Genero.findByPk(Math.ceil(Math.random() * 15))
                console.log(genero1)

                // Neste momento, o filme 7 não tem géneros associados
                const filme7 = await Filme.findByPk(7)
                console.log(filme7)

                await filme7.setGeneros([genero1, genero2, genero3])
                    .then(() => console.log('Géneros associados com sucesso!'))
                    .catch(error => { return error })

                // Isto faz com que atualize a tabela primeiro, e só depois é que 
                // vai buscar os filmes (assim aparece o que acabámos de criar na lista)
                return await sequelize.sync().then(async () => {
                    return await Filme.findAll({
                        include: [{
                            model: Genero
                        }]
                    })
                })
            })
            .then(result => res.json(result))
            .catch(error => { return error })
        return response
    },

    filme_list: async (req, res) => {

        const order =
            (req.query.order == 'id' || 'avaliacao' || 'data_lancamento' || 'titulo') ?
                req.query.order : 'id'

        await sequelize.sync()
            .then(async () => {
                await Filme
                    .findAll({
                        include: [{
                            model: Genero,
                            attributes: ['descricao'],  // inclui a descrição do género...
                            through: { attributes: [] }  // ...sem a tabela de relação
                        }],
                        order: [[order, (order == 'avaliacao' || order == 'data_lancamento') ? 'DESC' : 'ASC']]

                    })
                    .then(data => {
                        res.status(200).json({
                            success: true,
                            order: order, // só pra debugs do lado do frontend
                            data: data
                        })
                    })
            }).catch(error => { return error });
    },


    genero_list: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await Genero.findAll({ order: [['id', 'ASC']] })
                    .then(data => { res.status(200).json({ success: true, data: data }) })
            }).catch(error => { return error })
    },

    filme_detail: async (req, res) => {
        let id = req.params.id

        await sequelize.sync()
            .then(async () => {
                await Filme
                    .findOne({
                        where: { id: id },
                        include: [{
                            model: Genero,
                            attributes: ['descricao'],
                            through: { attributes: [] }
                        }]
                    })
                    .then(data => { res.status(200).json({ success: true, data: data }) })
            }).catch(error => { return error });
    },

    filme_create: async (req, res) => {

        const novoFilme = req.body;
        console.log(novoFilme)

        await sequelize.sync()
            .then(() => {
                return Filme.create({
                    titulo: novoFilme.titulo,
                    descricao: novoFilme.descricao,
                    foto: novoFilme.foto ?? null,
                    avaliacao: novoFilme.avaliacao,
                    data_lancamento: novoFilme.lancamento
                })

            })
            .then(async (resultFilme) => {
                const filme = await Filme.findOne({ where: { id: resultFilme.id } })
                const generos = await Genero.findAll({
                    where: {
                        'descricao': {
                            [Op.or]: novoFilme.generos
                        }
                    }
                })

                await filme.setGeneros(generos).then(() => console.log('Generos atualizados!'))
                return filme
            })
            .then((filme) => {
                console.log('Create concluido!');
                console.log(filme)
                res.status(200).json({
                    success: true,
                    data: filme
                })
            })
            .catch(error => { return error })

    },

    filme_update: async (req, res) => {
        const filmeId = req.params.id
        const updateInfo = req.body
        const generosFilme = Array.from(req.body.generos, genero => { return genero.descricao })

        console.log(generosFilme)

        await sequelize.sync()
            .then(async () => {
                return await Filme.update({
                    titulo: updateInfo.titulo,
                    descricao: updateInfo.descricao,
                    avaliacao: updateInfo.avaliacao,
                    data_lancamento: updateInfo.lancamento,
                    foto: updateInfo.foto ?? null,
                }, {
                    where: { id: filmeId },
                    returning: true
                })

            })
            .then(async () => {
                const filme = await Filme.findOne({ where: { id: filmeId } })
                const generos = await Genero.findAll({
                    where: {
                        'descricao': {
                            [Op.or]: generosFilme
                        }
                    }
                })
                await filme.setGeneros(generos).then(() => console.log('Generos atualizados!'))

            })
            .then(() => {
                console.log('Update concluido!');
                res.status(200).json({
                    success: true,
                    data: 'Update concluído!'
                })
            })
            .catch(error => { return error })
    },

    filme_delete: async (req, res) => {
        const filmeId = req.params.id

        // TODO eliminar também (com bulkDestroy?) as instnaces da tabela de relação

        await sequelize.sync()
            .then(async () => {
                await Filme.destroy({
                    where: { id: filmeId}
                })
                .then(() => res.send(200).json({
                    success: true,
                    data: 'Filme com o id ' + filmeId + ' eliminado.'
                }))
            })
            .catch(error => { return error })
    }






    */
