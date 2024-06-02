const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');
// const Workout = require('../models/workoutmodel');
const router = express.Router();

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