const connection = require('./connection')
connection.sync()

module.exports = {
    Exercise: require('./models/Exercise')
}
