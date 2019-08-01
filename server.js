const cors = require('cors')
const express = require('express')
const app = express()

const authorizeRequest = require('./utils/authorize-request')

app.use(cors())
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

// app.use((req, res, next) => {
//     const methods = ['POST', 'PUT', 'PATCH', 'DELETE']
//     if (methods.includes(req.method)) {
//         authorizeRequest(req, res, next)
//     } else next()
// })

// Express middleware
app.use(express.json())
app.use('/v1/exercises', require('./routes/exercises'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
