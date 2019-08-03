require('dotenv').config()
const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const app = express()

// Express middleware
app.use(express.json())

// EJS view engine
app.use(express.static('views'))
app.set('view engine', 'ejs')

// Documentation data
const sidebarRoutes = require('./docs/sidebar-routes') || []
const routeMap = require('./docs/route-map') || {}

// Express Session middleware
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.CLIENT_SECRET
    })
)

// CORS headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE'
        )
        return res.status(200).json({})
    }

    next()
})

// Authorization middleware
app.use((req, res, next) => {
    const allowedRoutes = [
        'GET /',
        'GET /v1/exercises',
        'POST /v1/users',
        'GET /v1/auth',
        'POST /v1/auth/login'
    ]
    const requestedRoute = req.method + ' ' + req.path

    // If a user is accessing documentation, skip authentication
    if (req.path.includes('/docs')) return next()

    // If requested route is allowed, request is able to bypass JWT token verification
    if (allowedRoutes.includes(requestedRoute)) return next()

    // If there is no 'Authorization' header, return status 401
    if (!req.headers.authorization)
        return res.status(401).json({ status: 401, msg: 'Unauthorized user' })
    //
    // Proceed to extract access token and verify it
    else {
        const bearerToken = req.headers.authorization.split(': ')

        // If 'Authorization' header format is incorrect, return status 401
        if (bearerToken.length === 1)
            return res.status(401).json({ msg: 'Unauthorized user' })

        jwt.verify(bearerToken[1], process.env.CLIENT_ID, (err, data) => {
            if (err)
                return res
                    .status(401)
                    .json({ status: 401, msg: 'Unauthorized user' })
            else next()
        })
    }
})

// API routes
app.use('/v1/exercises', require('./routes/exercises'))
app.use('/v1/workouts', require('./routes/workouts'))
app.use('/v1/users', require('./routes/users'))
app.use('/v1/auth', require('./routes/auth'))

// API documentation routes
app.get('/', (req, res, next) =>
    res.render('index', { path: '/', sidebarRoutes })
)

app.get('/docs/*', (req, res, next) => {
    const { documentation, displayTitle } = routeMap[req.path] || []

    res.render('index', {
        path: '/docs',
        sidebarRoutes,
        documentation,
        displayTitle
    })
})

// Error handling middlewre
const sequelizeErrorHandler = require('./utils/errors-sequelize')
app.use((err, req, res, next) => {
    console.log(Object.keys(err.errors[0]))

    // Finds whether or not error originated from Sequelize
    const sequelizeError = sequelizeErrorHandler(err)
    if (sequelizeError)
        return res.status(sequelizeError.status).json(sequelizeError)

    res.status(500).send({ status: 500, msg: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
