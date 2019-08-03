const connection = require('../connection')
const { Sequelize } = connection
const { id } = require('./_env.config')

const Workout = connection.define(
    'workout',
    {
        ...id,
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        slug: {
            type: Sequelize.STRING
        },
        forkedFrom: {
            type: Sequelize.STRING
        }
    },
    {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
    }
)

Workout.addHook('beforeCreate', (workout, options) => {
    workout.slug = workout.name.replace(/[\W_]+/g, '-').toLowerCase()
})

module.exports = Workout
