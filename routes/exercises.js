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

router.put('/:id', (req, res, next) => {
    Exercise.findByPk(req.params.id)
        .then(exercise => exercise.update(req.body))
        .then(exercise => res.json(exercise))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Exercise.destroy({ where: { id: req.params.id } })
        .then(() => res.json({ msg: 'Exercise successfully deleted.' }))
        .catch(next)
})

module.exports = router
