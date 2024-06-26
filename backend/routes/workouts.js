const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth')

// const Workout = require('../models/workoutmodel');
const router = express.Router();

// using a require auth middleware function to authenticate the request
router.use(requireAuth)

// making request handlers

// GET all workouts
router.get('/',getWorkouts)

// GET a single workout 
router.get('/:id',getWorkout)

// POST a new workout
router.post('/',createWorkout)

// Delete a workout
router.delete('/:id',deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router;