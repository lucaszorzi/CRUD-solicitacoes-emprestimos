const Sequelize = require('sequelize');
const database = require('../db');

const Solicitacao = database.define('solicitacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        validate: {
            isNumeric: true,
            isEven(value) {
                if(value.length != 14) {
                    throw new Error(`CNPJ com quantidade de números inválidos!`)
                }
            }
        }
    },
    valor_emprestimo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },
    faturamento: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEven(value) {
                const reg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/i;
                if (!reg.test(value)) {
                    throw new Error(`Favor verificar o nome. Contém caracteres inválidos (${value})`);
                }
            }
        }
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
            isNumeric: true,
            isEven(value) {
                if(value.length != 11) {
                    throw new Error(`CPF com quantidade de números inválidos!`)
                }
            }
        }
    },
    telefone: {
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
            isNumeric: true,
            isEven(value) {
                if(value.length < 10) {
                    throw new Error(`Telefone com quantidade de números inválidos!`)
                }
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

module.exports = Solicitacao;