const bcrypt = require('bcrypt')
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
                msg: 'There is already an user with this email.'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        }
    },
    {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'password'] }
        },
        scopes: { authentication: {} }
    }
)

/**
 * Stores a bcrypt hash for user's password.
 */
User.addHook('beforeSave', async (user, options) => {
    const hash = await bcrypt.hash(user.password, 5)
    user.password = hash
})

/**
 * Deletes `updatedAt` and `password` fields on newly created User instance.
 * Implemented to standardize the User instance's object literal.
 */
User.addHook('afterCreate', async (user, options) => {
    delete user.dataValues.password
    delete user.dataValues.updatedAt
})

/**
 * Authenticates given password with stored password.
 *
 * @return {boolean} - If true, the given password is valid
 */
User.prototype.authenticate = function(password) {
    return bcrypt.compare(password, this.password)
}

module.exports = User
