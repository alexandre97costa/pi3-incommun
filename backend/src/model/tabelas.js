const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt')

// ######################################################
// ################### DEFINIÇÕES #######################
// ######################################################

const Formulario = sequelize.define('formulario',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Grupo = sequelize.define('grupo',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Pergunta = sequelize.define('pergunta',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        },
        valor_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: 'Não é um FLOAT válido'
                }
            }
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const TipoPergunta = sequelize.define('tipo_pergunta',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        obs: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        name: {
            singular: 'tipo_pergunta',
            plural: 'tipos_perguntas'
        },
    }
)

const Resposta = sequelize.define('resposta',
    {
        texto: {
            type: DataTypes.STRING
        },
        inteiro: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        },
        valor_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: 'Não é um FLOAT válido'
                }
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        validate: {
            EitherTextoInteiro() {
                if ((this.texto === null) && (this.inteiro === null)) {
                    throw new Error('Pelo menos um de "texto" ou "inteiro" tem que estar preenchido.')
                }
            }
        }
    }
)

const Pedido = sequelize.define('pedido',
    {
        valor_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: '\x1b[31mO preço total não é um FLOAT válido.\x1b[0m'
                },
                notNull: {
                    args: true,
                    msg: '\x1b[31mO preço total do pedido não pode estar vazio.\x1b[0m'
                }
            }
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const EstadoPedido = sequelize.define('estado_pedido',
    {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: {
                args: true,
                msg: 'A descrição do estado do pedido não pode estar vazia.'
            }
        },
        icon: DataTypes.STRING,
        cor: DataTypes.STRING,
        obs: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

const MotivoRecusa = sequelize.define('motivo_recusa_pedido',
    {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: {
                args: true,
                msg: 'A descrição do motivo de recusa do pedido não pode estar vazia.'
            }
        },
        obs: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

const Cliente = sequelize.define('cliente',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO nome do cliente não pode estar vazio.\x1b[0m'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: '\x1b[31mO email do cliente não pode estar vazio. Os orçamentos são enviados para lá!\x1b[0m'
                },
                isEmail: {
                    args: true,
                    msg: '\x1b[31mO email inserido não é válido.\x1b[0m'
                }
            }
        },
        empresa: {
            type: DataTypes.STRING
        },
        tlm: {
            type: DataTypes.INTEGER
        },

    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

// ######################################################
// ################### ASSOCIAÇÕES ######################
// ######################################################

// Formulario  1:N  GrupoPerguntas
Formulario.hasMany(Grupo, {
    foreignKey: {
        name: 'formulario_id',
        allowNull: false
    }
});
Grupo.belongsTo(Formulario, {
    foreignKey: {
        name: 'formulario_id',
        allowNull: false
    }
});

// ######################################################

// GrupoPerguntas  1:N  Pergunta
// ? as perguntas não precisam de necessariamente ter um grupo
// * Não há nenhum caso disto, mas não é impossível,
// * daí a foreignKey poder ser null
Grupo.hasMany(Pergunta, { foreignKey: 'grupo_id' });
Pergunta.belongsTo(Grupo, { foreignKey: 'grupo_id' });

// ######################################################

// Pergunta N:1 TipoPergunta
TipoPergunta.hasMany(Pergunta, {
    foreignKey: {
        name: 'tipo_id',
        allowNull: false
    }
})
Pergunta.belongsTo(TipoPergunta, {
    as: 'tipo_pergunta',
    foreignKey: {
        name: 'tipo_id',
        allowNull: false
    }
})

// ######################################################

// Pedido  N:1  Cliente
Cliente.hasMany(Pedido, {
    foreignKey: {
        name: 'cliente_id',
        allowNull: false
    }
});
Pedido.belongsTo(Cliente, {
    foreignKey: {
        name: 'cliente_id',
        allowNull: false
    }
});

// ######################################################

EstadoPedido.hasMany(Pedido, {
    foreignKey: {
        name: 'estado_id',
        allowNull: false
    }
});
Pedido.belongsTo(EstadoPedido, {
    foreignKey: {
        name: 'estado_id',
        allowNull: false
    }
})

// ######################################################

MotivoRecusa.hasMany(Pedido, { foreignKey: 'motivo_id' });
Pedido.belongsTo(MotivoRecusa, { foreignKey: 'motivo_id' })

// ######################################################

// Resposta  N:1  Pedido
Pedido.hasMany(Resposta, {
    foreignKey: {
        name: 'pedido_id',
        allowNull: false
    }
});
Resposta.belongsTo(Pedido, {
    foreignKey: {
        name: 'pedido_id',
        allowNull: false
    }
});

// ######################################################

// Pergunta  1:N  Resposta
Pergunta.hasMany(Resposta, {
    foreignKey: {
        name: 'pergunta_id',
        allowNull: false
    }
});
Resposta.belongsTo(Pergunta, {
    foreignKey: {
        name: 'pergunta_id',
        allowNull: false
    }
});

// ######################################################
// ################# USER BACK OFFICE ###################
// ######################################################

const UserIncommun = sequelize.define('user_incommun', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO email não pode estar vazio.\x1b[0m'
            },
            isEmail: {
                args: true,
                msg: '\x1b[31mO email inserido não é válido.\x1b[0m'
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO username não pode estar vazio.\x1b[0m'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mA password não pode estar vazia.\x1b[0m'
            }
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})

UserIncommun.beforeCreate(user => {

    return bcrypt.hash(user.password, 10)
        .then(hash => { user.password = hash; })
        .catch(err => { throw new Error(err); });
});

const UserIncommunRole = sequelize.define('user_incommun_role', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    obs: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
})

UserIncommunRole.hasMany(UserIncommun, {
    foreignKey: {
        name: 'role_id',
        allowNull: false
    }
})
UserIncommun.belongsTo(UserIncommunRole, {
    foreignKey: {
        name: 'role_id',
        allowNull: false
    }
})

module.exports = {
    Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole
}