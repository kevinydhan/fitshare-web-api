module.exports = {
    endpoint: '/v1/workouts',
    actions: [
        {
            method: 'GET',
            route: '/docs/workouts/get',
            displayTitle: 'GET /v1/workouts',
            documentation: []
        },
        {
            method: 'POST',
            route: '/docs/workouts/post',
            displayTitle: 'POST /v1/workouts',
            documentation: []
        },
        {
            method: 'PUT /:id',
            route: '/docs/workouts/put',
            displayTitle: 'PUT /v1/workouts/:id',
            documentation: []
        },
        {
            method: 'DELETE /:id',
            route: '/docs/workouts/delete',
            displayTitle: 'DELETE /v1/workouts',
            documentation: []
        }
    ]
}
