const express = require('express')
const router = express.Router()

// Sequelize database models
const { Workout, WorkoutExercise, Exercise } = require('../database')

/**
 * GET /v1/workouts
 *
 * Retrieves all workouts with array of exercise objects under
 * `"workoutExercises"` key.
 */
router.get('/', (req, res, next) => {
    Workout.findAll({
        include: [
            {
                model: WorkoutExercise,
                order: [['order', 'ASC']],
                include: [Exercise]
            }
        ]
    })
        .then(workouts => res.json(workouts))
        .catch(next)
})

/**
 * POST /v1/workouts
 *
 * Creates a new workout instance given the details, userId,
 * and an array of exercise details.
 */
router.post('/', async (req, res, next) => {
    // Returns 422 if workout has no exercises or exercises array is empty
    if (!req.body.exercises || !req.body.exercises.length)
        return res.status(422).json({
            status: 422,
            msg: 'Missing exercises.'
        })

    try {
        // Extracts exercises array from req.body
        const { exercises, ...workoutDetails } = req.body

        // Creates a new workout instance, whose id is used to create associations to an exercise in the WorkoutExercise join table
        const workout = await Workout.create(workoutDetails)

        // Iterates through exercises array and creates associations between created workout and exercises
        await Promise.all(
            exercises.map((exercise, i) => {
                const { id, ...exerciseDetails } = exercise
                return WorkoutExercise.create({
                    ...exerciseDetails,
                    exerciseId: id,
                    order: i,
                    workoutId: workout.id
                })
            })
        )

        res.json(workout)
    } catch (err) {
        next(err)
    }
})

/**
 * DELETE /v1/workouts
 *
 * Deletes a workout. The delete request cascades and will delete
 * all entries in WorkoutExercise with the given workout id.
 */
router.delete('/:id', async (req, res, next) => {
    try {
        await Workout.delete({ where: { id: req.params.id } })

        res.json({ status: 200, msg: 'Successfully deleted workout' })
    } catch (err) {
        next(err)
    }
})

module.exports = router
