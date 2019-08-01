const express = require('express')
const router = express.Router()

// Sequelize database models
const { User } = require('../database')

/**
 * GET /v1/auth
 *
 * Sends user's information if user's session is active.
 * Otherwise, an empty object literal will be sent.
 */
router.get('/', async (req, res, next) => {
    try {
        // Checks if user's session is active
        if (req.session.userId) {
            const user = await User.findByPk(req.session.userId)
            res.json(user)

            // Sends empty object literal if no session is found
        } else res.json({})
    } catch (err) {
        next(err)
    }
})

/**
 * POST /v1/auth/login
 *
 * Authenticates a user when logging in.
 */
router.post('/login', async (req, res, next) => {
    try {
        // Extracts credentials from request body
        const { email, password } = req.body

        // Attempts to locate a user with given email
        // Returns null if no match is found
        const user = await User.scope('authentication').findOne({
            where: { email }
        })

        // If null, send status 401
        if (!user)
            return res.status(404).json({
                msg: 'There is no user associated with this email.'
            })

        // If a user with given email exists, proceed to check given password
        const isAuthenticated = await user.authenticate(password)
        if (!isAuthenticated)
            return res.status(401).json({
                msg: 'Incorrect password.'
            })

        // Sets user's id to current session
        req.session.userId = user.id
        res.json(user)
    } catch (err) {
        next(err)
    }
})

/**
 * POST /v1/auth/logout
 *
 * Logs a user out. When request to this route is made, session will be destroyed.
 */
router.post('/logout', async (req, res, next) => {
    try {
        // Destroy's user's session
        req.session.destroy()
        res.json()
    } catch (err) {
        next(err)
    }
})

module.exports = router
