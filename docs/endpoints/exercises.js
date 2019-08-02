module.exports = {
    endpoint: '/v1/exercises',
    actions: [
        {
            method: 'GET',
            route: '/docs/exercises/get',
            displayTitle: 'GET /v1/exercises',
            documentation: [
                {
                    title: 'Request',
                    sections: [
                        {
                            header: 'Options',
                            description:
                                'Below is an example request to this endpoint:',
                            codeBlockPath:
                                './code-blocks/exercises/get/options.ejs'
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
                                'Below is an example response from this endpoint:',
                            codeBlockPath:
                                './code-blocks/exercises/get/response.ejs'
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
            displayTitle: 'POST /v1/exercises',
            documentation: [
                {
                    title: 'Request',
                    sections: [
                        {
                            header: 'Options',
                            description:
                                'Below is an example request to this endpoint:',
                            codeBlockPath:
                                './code-blocks/exercises/post/options.ejs'
                        },
                        {
                            header: 'Body',
                            description: `Below is an example request body for this endpoint:`,
                            codeBlockPath:
                                './code-blocks/exercises/post/body.ejs'
                        }
                    ]
                },
                {
                    title: 'Response',
                    sections: [
                        {
                            header: '201',
                            description:
                                'After successfully creating a new exercise instance, the following information will be returned:',
                            codeBlockPath:
                                './code-blocks/exercises/post/response.ejs'
                        },
                        {
                            header: '401',
                            description:
                                'The server rejected the request because it received an invalid access token.'
                        },
                        { header: '500', description: 'Internal server error!' }
                    ]
                },
                {
                    title: 'Restrictions',
                    sections: [
                        {
                            description: `Only administrators can access this endpoint.`
                        }
                    ]
                }
            ]
        },
        {
            method: 'PUT /:id',
            route: '/docs/exercises/put',
            displayTitle: 'PUT /v1/exercises/:id',
            documentation: [
                {
                    title: 'Request',
                    sections: [
                        {
                            header: 'Options',
                            description:
                                'Below is an example request to this endpoint:',
                            codeBlockPath:
                                './code-blocks/exercises/put/options.ejs'
                        },
                        {
                            header: 'Body',
                            description: `Below is an example request body for this endpoint:`,
                            codeBlockPath:
                                './code-blocks/exercises/put/body.ejs'
                        }
                    ]
                },
                {
                    title: 'Response',
                    sections: [
                        {
                            header: '201',
                            description:
                                'After successfully creating a new exercise instance, the following information will be returned:',
                            codeBlockPath:
                                './code-blocks/exercises/put/response.ejs'
                        },
                        {
                            header: '401',
                            description:
                                'The server rejected the request because it received an invalid access token.'
                        },
                        { header: '500', description: 'Internal server error!' }
                    ]
                },
                {
                    title: 'Restrictions',
                    sections: [
                        {
                            description: `Only administrators can access this endpoint.`
                        }
                    ]
                }
            ]
        },
        {
            method: 'DELETE /:id',
            route: '/docs/exercises/delete',
            displayTitle: 'DELETE /v1/exercises/:id',
            documentation: []
        }
    ]
}
