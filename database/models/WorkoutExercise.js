const connection = require('../connection')
const { Sequelize } = connection
const { id } = require('./_env.config')

const WorkoutExercise = connection.define(
    'workoutExercise',
    {
        ...id,
        sets: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        reps: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        rest: {
            type: Sequelize.INTEGER
        },
        order: {
            type: Sequelize.INTEGER
        }
    },
    {
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'workoutId', 'exerciseId']
            }
        }
    }
)

module.exports = WorkoutExercise
