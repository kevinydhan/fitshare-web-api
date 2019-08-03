const connection = require('../connection')
const { Sequelize } = connection
const { id } = require('./_env.config')

const Exercise = connection.define(
    'exercise',
    {
        ...id,
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true,
            unique: {
                args: true,
                msg: 'There is already an exercise with this name.'
            }
        },
        slug: {
            type: Sequelize.STRING
        },
        equipment: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        targetMuscles: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false
        },
        instructions: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        images: {
            type: Sequelize.JSON
        },
        external: {
            type: Sequelize.JSON
        },

        level: Sequelize.STRING,
        rating: Sequelize.DOUBLE
    },
    {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
    }
)

Exercise.addHook('beforeCreate', (exercise, options) => {
    exercise.slug = exercise.name.replace(/[\W_]+/g, '-').toLowerCase()
})

module.exports = Exercise
