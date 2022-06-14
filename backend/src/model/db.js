const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'd74bfknmfhh7mj',
    'qlxojjauwpguba',
    '3aa23e8c63b4a07eb64b73e4b3b6daface9691c725e92e2a8191ddf289a94bea',
    {
        host: 'ec2-34-247-72-29.eu-west-1.compute.amazonaws.com',
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