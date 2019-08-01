const express = require('express')
const router = express.Router()

// Sequelize database models
const { User } = require('../database')

/**
 * POST /v1/auth
 *
 * Authenticates a user when logging in.
 */
router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findAll({ where: { email, password } })

        if (!user.length)
            return res.status(401).json({
                status: 401,
                msg: 'Incorrect email or password'
            })

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
        req.session.destroy()
        res.json()
    } catch (err) {
        next(err)
    }
})

module.exports = router
