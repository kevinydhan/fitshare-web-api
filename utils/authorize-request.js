require('dotenv').config()

const authorizeRequest = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ status: 401, msg: 'Unauthorized' })

    const [bearer, bearerId] = req.headers.authorization.split(': ')
    if (bearerId !== process.env.ACCESS_TOKEN)
        return res.status(401).json({ msg: 'Unauthorized' })

    next()
}

module.exports = authorizeRequest
