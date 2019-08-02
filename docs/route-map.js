const documentation = require('./data')

const createRouteMap = arr => {
    // Instantiate new array
    let routes = []

    /**
     * Flatten the documentation array by iterating over each
     * endpoint object literal and pushing the `endpoint.action`'s
     * elements into the empty array.
     */
    arr.forEach(e => routes.push(...e.actions))

    /**
     * Create a hash map of each `endpoint.action` object literal.
     * The resulting hash map will use the `endpoint.action.route`
     * as the key and `endpoint.action.documentation` as the value.
     */
    return routes.reduce((acc, curr) => {
        if (curr.route) acc[curr.route] = curr.documentation || []
        else console.warn('Unable to find route for endpoint', curr)

        return acc
    }, {})
}

module.exports = createRouteMap(documentation)
