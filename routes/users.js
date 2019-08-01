const express = require('express')
const router = express.Router()

// Sequelize database models
const { User } = require('../database')

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        // Creates a new user with given information
        const user = await User.create(req.body)
        res.json(user)
    } catch (err) {
        next(err)
    }
})

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

router.delete('/:id', async (req, res, next) => {
    try {
        // Attempts to delete user in database
        // Returns 1 if successful and 0 if no user with provided id found
        const user = await User.destroy({ where: { id: req.params.id } })

        // Sends status 204 if no user was found
        if (user === 0) return res.status(204).json()

        res.json({ status: 200, msg: 'User was successfully deleted.' })
    } catch (err) {
        next(err)
    }
})

module.exports = router
