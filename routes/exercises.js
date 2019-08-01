const express = require('express')
const router = express.Router()

// Sequelize database models
const { Exercise } = require('../database')
const authorizeRequest = require('../utils/authorize-request')

router.get('/', (req, res, next) => {
    Exercise.findAll()
        .then(exercises => res.json(exercises))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Exercise.create(req.body)
        .then(exercise => res.json(exercise))
        .catch(next)
})

module.exports = router
