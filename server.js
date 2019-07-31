require('dotenv').config()
const express = require('express')
const app = express()

// Database models
const { Exercise } = require('./database')

const authorize = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ status: 401, msg: 'Unauthorized' })

    const [bearer, bearerId] = req.headers.authorization.split(': ')
    if (bearerId !== process.env.ACCESS_TOKEN)
        res.status(401).json({ msg: 'Unauthorized' })
    next()
}

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

// Express middleware
app.use(express.json())

app.get('/v1/exercises', (req, res, next) => {
    Exercise.findAll()
        .then(exercises => res.json(exercises))
        .catch(next)
})

app.post('/v1/exercises', authorize, (req, res, next) => {
    Exercise.create(req.body)
        .then(exercise => res.json(exercise))
        .catch(next)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
