const express = require('express')
const router = express.Router()

// Sequelize database models
const { User } = require('../database')

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (err) {
        next(err)
    }
})

module.exports = router
