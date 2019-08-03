const validator = require('validator')

const handleDuplicateEmailError = err => {
    if (err.validatorKey === 'not_unique' && validator.isEmail(err.value))
        return { status: 409, msg: err.message }

    return null
}

module.exports = err => {
    // All Sequelize errors are attached to `err.errors`.
    if (!err.errors) return null
    else if (!Array.isArray(err.errors)) return null

    const errors = err.errors[0]

    const duplicateEmailError = handleDuplicateEmailError(errors)
    if (duplicateEmailError) return duplicateEmailError

    return null
}
