require('dotenv').config()
const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const app = express()

// Express JSON middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express Session middleware
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: '1234'
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
    const allowedRoutes = ['POST /v1/users']
    const requestedRoute = req.method + ' ' + req.path

    // If requested route is allowed, request is able to bypass JWT token verification
    if (allowedRoutes.includes(requestedRoute)) return next()

    // If there is no 'Authorization' header, return status 401
    if (!req.headers.authorization)
        return res.status(401).json({ msg: 'Unauthorized user' })
    //
    // Proceed to extract access token and verify it
    else {
        const bearerToken = req.headers.authorization.split(': ')

        // If 'Authorization' header format is incorrect, return status 401
        if (bearerToken.length === 1)
            return res.status(401).json({ msg: 'Unauthorized user' })

        jwt.verify(bearerToken[1], process.env.CLIENT_ID, (err, data) => {
            if (err) return res.status(401).json({ msg: 'Unauthorized user' })
            else next()
        })
    }
})

// API routes
app.use('/v1/exercises', require('./routes/exercises'))
app.use('/v1/workouts', require('./routes/workouts'))
app.use('/v1/users', require('./routes/users'))
app.use('/v1/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
