const express = require('express')
const router = express.Router()

// Sequelize database models
const { Workout, WorkoutExercise, Exercise } = require('../database')

router.get('/', (req, res, next) => {
    Workout.findAll({
        include: [{ model: WorkoutExercise, include: [Exercise] }]
    })
        .then(workouts => res.json(workouts))
        .catch(next)
})

router.post('/', async (req, res, next) => {
    try {
        const newWorkout = await Workout.create(req.body)
    } catch (err) {
        next(err)
    }
})

module.exports = router
