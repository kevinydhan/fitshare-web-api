module.exports = {
    endpoint: '/v1/exercises',
    actions: [
        {
            method: 'GET',
            route: '/docs/exercises/get',
            documentation: [
                {
                    title: 'Request',
                    sections: [
                        {
                            header: 'Options',
                            description:
                                'Below are example requests to this endpoint:'
                        },
                        {
                            header: 'Body',
                            description: `This endpoint does not require a request body.`
                        }
                    ]
                },
                {
                    title: 'Response',
                    sections: [
                        {
                            header: '200',
                            description:
                                'Below is an example response from this endpoint:'
                        },
                        { header: '500', description: 'Internal server error!' }
                    ]
                },
                {
                    title: 'Restrictions',
                    sections: [
                        {
                            description: `There are no restrictions for this endpoint.`
                        }
                    ]
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
}
