module.exports = {
    endpoint: '/v1/workouts',
    actions: [
        { method: 'GET', route: '/docs/workouts/get', documentation: [] },
        { method: 'POST', route: '/docs/workouts/post', documentation: [] },
        {
            method: 'PUT /:id',
            route: '/docs/workouts/put',
            documentation: []
        },
        {
            method: 'DELETE /:id',
            route: '/docs/workouts/delete',
            documentation: []
        }
    ]
}
