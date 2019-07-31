const connection = require('./connection')
const { Sequelize } = connection

const Exercise = connection.define(
    'exercise',
    {
        name: Sequelize.STRING,
        equipment: Sequelize.STRING,
        targetMuscles: Sequelize.ARRAY(Sequelize.STRING),
        instructions: Sequelize.ARRAY(Sequelize.TEXT),
        images: Sequelize.JSON,
        external: Sequelize.JSON,

        level: Sequelize.STRING,
        rating: Sequelize.DOUBLE
    },
    {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
    }
)

module.exports = Exercise
