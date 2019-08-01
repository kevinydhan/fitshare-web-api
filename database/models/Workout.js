const connection = require('../connection')
const { Sequelize } = connection

const Workout = connection.define(
    'workout',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
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
