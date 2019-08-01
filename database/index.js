const connection = require('./connection')
connection.sync({ force: true })

module.exports = {
    Exercise: require('./models/Exercise')
}
