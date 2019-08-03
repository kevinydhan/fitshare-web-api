const Sequelize = require('sequelize')

const id =
    process.env.NODE_ENV === 'production'
        ? {
              id: {
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.UUIDV4,
                  primaryKey: true
              }
          }
        : {}

module.exports = { id }
