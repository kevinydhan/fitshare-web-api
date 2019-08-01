require('dotenv').config()
const express = require('express')
const app = express()

// Handles CORS headers
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
    const methods = ['POST', 'PUT', 'PATCH', 'DELETE']

    if (
        (methods.includes(req.method) && !req.headers.authorization) ||
        (methods.includes(req.method) &&
            req.headers.authorization !== 'Bearer: ' + process.env.ACCESS_TOKEN)
    )
        return res.status(401).json({ status: 401, msg: 'Unauthorized' })

    next()
})

// Express JSON middleware
app.use(express.json())

// API routes
app.use('/v1/exercises', require('./routes/exercises'))
app.use('/v1/workouts', require('./routes/workouts'))
app.use('/v1/users', require('./routes/users'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
