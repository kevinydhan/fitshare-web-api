module.exports = {
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
