const express = require('express')
const router = express.Router()

// Sequelize database models
const { Exercise } = require('../database')

/**
 * GET /v1/exercises
 *
 * Retrieves all exercises.
 */
router.get('/', async (req, res, next) => {
    try {
        const exercises = await Exercise.findAll()
        res.json(exercises)
    } catch (err) {
        next(err)
    }
})

/**
 * POST /v1/exercises
 *
 * Creates a new exercise.
 */
router.post('/', async (req, res, next) => {
    try {
        const exercise = await Exercise.create(req.body)
        res.json(exercise)
    } catch (err) {
        next(err)
    }
})

/**
 * PUT /v1/exercises/:id
 *
 * Updates an exercise with the given information.
 */
router.put('/:id', async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id)
        const updatedExercise = await exercise.update(req.body)
        res.json(updatedExercise)
    } catch (err) {
        next(err)
    }
})

/**
 * DELETE /v1/exercises/:id
 *
 * Deletes an exercise with the given id.
 */
router.delete('/:id', async (req, res, next) => {
    try {
        // Attempts to delete exercise in database
        // Returns 1 if successful and 0 if there is no instance with given id
        const exercise = await Exercise.destroy({
            where: { id: req.params.id }
        })

        // Sends status 204 if no instance was found
        if (exercise === 0) return res.status(204).json()

        res.json({ status: 200, msg: 'Exercise was successfully deleted.' })
    } catch (err) {
        next(err)
    }
})

module.exports = router
