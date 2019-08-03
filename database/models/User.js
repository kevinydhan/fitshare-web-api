const bcrypt = require('bcrypt')
const connection = require('../connection')
const { Sequelize } = connection

const User = connection.define(
    'user',
    {
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
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'password'] }
        },
        scopes: {
            authentication: { attributes: { exclude: ['updatedAt'] } }
        }
    }
)

/**
 * Stores a bcrypt hash for user's password.
 */
User.addHook('beforeSave', async user => {
    const hash = await bcrypt.hash(user.password, 5)
    user.password = hash
})

/**
 * Deletes `updatedAt` and `password` fields in the User instance.
 * Also, if the user is not an admin, the hook proceeds to delete `isAdmin`.
 * Implemented to standardize the User instance's object literal.
 */
User.addHook('afterCreate', user => user.sanitize())
User.addHook('afterUpdate', user => user.sanitize())

/**
 * @temporary
 *
 * Standardizes user instances to remove `isAdmin` field if the user is not
 * an admin.
 */
User.addHook('afterFind', user => {
    if (Array.isArray(user))
        user.forEach(u => {
            if (!u.dataValues.isAdmin) delete u.dataValues.isAdmin
        })
    else if (typeof user === 'object' && Object.keys(user).length) {
        if (!user.dataValues.isAdmin) delete user.dataValues.isAdmin
    }
})

/**
 * Authenticates given password with stored password.
 *
 * @return {boolean} - If true, the given password is valid
 */
User.prototype.authenticate = function(password) {
    return bcrypt.compare(password, this.password)
}

/**
 * Sanitizes user instance's data object.
 */
User.prototype.sanitize = function() {
    if (this.dataValues.password) delete this.dataValues.password
    if (this.dataValues.updatedAt) delete this.dataValues.updatedAt
    if (this.dataValues.isAdmin === false) delete this.dataValues.isAdmin
}

module.exports = User
