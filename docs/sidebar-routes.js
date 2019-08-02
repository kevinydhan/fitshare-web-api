const documentation = require('./data')

module.exports = documentation.map(section => ({
    endpoint: section.endpoint,
    actions: section.actions.map(({ method, route }) => ({ method, route }))
}))
