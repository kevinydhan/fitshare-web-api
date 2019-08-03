const Exercise = require('./models/Exercise')
const Workout = require('./models/Workout')
const WorkoutExercise = require('./models/WorkoutExercise')
const User = require('./models/User')

const connection = require('./connection')

// Workouts and exercises have a many-to-many relationship. They are joined through the WorkoutExercise table.
Workout.hasMany(WorkoutExercise)
WorkoutExercise.belongsTo(Workout)

Exercise.hasMany(WorkoutExercise)
WorkoutExercise.belongsTo(Exercise)

// Users have a one-to-many relationship with workouts.
User.hasMany(Workout)
Workout.belongsTo(User)

// Syncs database
const force = process.env.NODE_ENV === 'development'
console.log(force)
connection.sync({ force })

module.exports = {
    Exercise,
    Workout,
    WorkoutExercise,
    User
}
