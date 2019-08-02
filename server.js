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
    if (allowedRoutes.includes(requestedRoute)) return next()

    if (!req.header.authorization)
        return res.status(401).json({ msg: 'Unauthorized user' })
    else {
        const [bearer, accessToken] = req.header.authorization.split(': ')
        jwt.verify(accessToken, process.env.CLIENT_ID, (err, data) => {
            if (err) return res.status(401).json({ msg: 'Unauthorized user' })
            else next(data)
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
