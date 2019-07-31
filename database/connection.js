const Sequelize = require('sequelize')
const DATABASE_URL =
    process.env.DATABASE_URL || 'postgres://localhost/bodybuilding-exercises'

module.exports = new Sequelize(DATABASE_URL, { logging: false })
