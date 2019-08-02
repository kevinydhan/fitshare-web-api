module.exports = [
    { endpoint: '/v1/exercises', actions: require('./endpoints/exercises') },
    { endpoint: '/v1/workouts', actions: require('./endpoints/workouts') },
    { endpoint: '/v1/users', actions: require('./endpoints/users') },
    { endpoint: '/v1/auth', actions: require('./endpoints/auth') }
]
