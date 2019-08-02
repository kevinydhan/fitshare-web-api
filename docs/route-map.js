const documentation = require('./data')

const createRouteMap = arr => {
    // Instantiate new array

    /**
     * Flatten the documentation array by iterating over each
     * endpoint object literal and pushing the `endpoint.action`'s
     * elements into the empty array.
     */
    let routes = []
    arr.forEach(endpoint => routes.push(...endpoint.actions))
    /**
     * Create a hash map of each `endpoint.action` object literal.
     * The resulting hash map will use the `endpoint.action.route`
     * as the key and `endpoint.action.sections` as the value.
     */

    return routes.reduce((acc, curr) => {
        if (curr.route) {
            acc[curr.route] = {
                documentation: curr.documentation || [],
                displayTitle: curr.displayTitle || 'No title'
            }
        } else console.warn('Unable to find route for endpoint', curr)

        return acc
    }, {})
}

module.exports = createRouteMap(documentation)
