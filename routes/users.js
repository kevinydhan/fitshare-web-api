const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

// Sequelize database models
const { User } = require('../database')

/**
 * GET /v1/users
 *
 * Retrieves all users.
 */
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

/**
 * POST /v1/users
 *
 * Creates a new user.
 */
router.post('/', async (req, res, next) => {
    console.log(req.body)
    try {
        // Creates a new user with given information
        const user = await User.create(req.body)

        const accessToken = jwt.sign(user.get(), process.env.CLIENT_ID)
        req.session.userId = user.id
        res.json({ user, accessToken })
    } catch (err) {
        next(err)
    }
})

/**
 * PUT /v1/users/:id
 *
 * Updates a user instance with the given information.
 */
router.put('/:id', async (req, res, next) => {
    try {
        // Finds user in database with provided id
        const user = await User.findByPk(req.params.id)

        // Updates the user with provided information from req.body
        const updatedUser = await user.update(req.body)

        res.json(updatedUser)
    } catch (err) {
        next(err)
    }
})

/**
 * DELETE /v1/users/:id
 *
 * Deletes a user with the given id.
 */
router.delete('/:id', async (req, res, next) => {
    try {
        // Attempts to delete user in database
        // Returns 1 if successful and 0 if there is no instance with given id
        const user = await User.destroy({ where: { id: req.params.id } })

        // Sends status 204 if no instance was found
        if (user === 0) return res.status(204).json()

        res.json({ status: 200, msg: 'User was successfully deleted.' })
    } catch (err) {
        next(err)
    }
})

module.exports = router
