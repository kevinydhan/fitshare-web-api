module.exports = [
    {
        endpoint: '/v1/exercises',
        actions: [
            {
                method: 'GET',
                route: '/docs/exercises/get',
                documentation: [
                    {
                        title: 'Request',
                        description: `Below are example requests to GET /v1/exercises:`
                    },
                    {
                        title: 'Response',
                        description: `Below is an example`
                    },
                    {
                        title: 'Restrictions',
                        description: `There are no restrictions to this endpoint.`
                    }
                ]
            },
            {
                method: 'POST',
                route: '/docs/exercises/post',
                documentation: [{ title: 'Request Parameters' }]
            },
            {
                method: 'PUT /:id',
                route: '/docs/exercises/put',
                documentation: []
            },
            {
                method: 'DELETE /:id',
                route: '/docs/exercises/delete',
                documentation: []
            }
        ]
    },
    {
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
    },
    {
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
    },
    {
        endpoint: '/v1/auth',
        actions: [
            { method: 'GET', route: '/docs/auth/get', documentation: [] },
            {
                method: 'POST /login',
                route: '/docs/auth/post/login',
                documentation: []
            },
            {
                method: 'POST /logout',
                route: '/docs/auth/post/logout',
                documentation: []
            }
        ]
    }
]
