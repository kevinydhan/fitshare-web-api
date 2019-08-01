const connection = require('../connection')
const { Sequelize } = connection

const User = connection.define(
    'user',
    {
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true
        // },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true,
            isEmail: true,
            unique: {
                args: true,
                msg: 'There is already an exercise with this name.'
            }
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        }
    },
    {
        defaultScope: {
            attributes: { exclude: ['updatedAt'] }
        }
    }
)

module.exports = User