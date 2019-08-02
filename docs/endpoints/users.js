module.exports = {
    endpoint: '/v1/users',
    actions: [
        { method: 'GET', route: '/docs/users/get', documentation: [] },
        { method: 'POST', route: '/docs/users/post', documentation: [] },
        { method: 'PUT /:id', route: '/docs/users/put', documentation: [] },
        {
            method: 'DELETE /:id',
            route: '/docs/users/delete',
            documentation: []
        }
    ]
}
