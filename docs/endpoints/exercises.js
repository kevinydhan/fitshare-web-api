module.exports = {
    endpoint: '/v1/exercises',
    actions: [
        {
            method: 'GET',
            route: '/docs/exercises/get',
            documentation: [
                {
                    title: 'Request',
                    sections: [{ header: 'Options' }, { header: 'Body' }]
                },
                {
                    title: 'Response',
                    sections: []
                },
                {
                    title: 'Restrictions'
                    // sections: []
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
