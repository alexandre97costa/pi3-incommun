const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'dekf2pi7icgv6m',
    'olpegxpvhpbkqa',
    'd447a862e12d4717d3771f7781fc91c42dfd346533c89e657a17d0f7a3bf0529',
    {
        host: 'ec2-52-214-23-110.eu-west-1.compute.amazonaws.com',
        port: '5432',
        dialect: 'postgres',
        dialectOptions: {
            ssl: { rejectUnauthorized: false }
        },
        logging: false,
        define: {
            // hooks globais, atingem todos os modelos
            hooks: {
                afterCreate: model => {
                    console.log('\x1b[37m\x1b[46m ' + model.constructor.name + '(#' + model.id + ') criado \x1b[0m ')
                },
                afterUpdate: model => {
                    console.log('\x1b[37m\x1b[43m ' + model.constructor.name + '(#' + model.id + ') atualizado \x1b[0m ')
                },
                afterDestroy: model => {
                    console.log('\x1b[37m\x1b[41m ' + model.constructor.name + '(#' + model.id + ') eliminado ⚠ \x1b[0m ')
                }
            }
        }
    }
)

sequelize.sync()

module.exports = sequelize 