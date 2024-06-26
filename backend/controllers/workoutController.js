const Workout = require('../models/workoutmodel');
const mongoose = require('mongoose')

// we need to return (response) something in every function so that rest of the code also doesnt execute
// get all workouts
const getWorkouts = async (req,res) => {
    const user_id = req.user._id
    
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});

    res.status(200).json(workouts)
}


// get a  single workout
const getWorkout  = async(req,res) => {
    const { id } = req.params

    // checks if the id is in valid form
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : "no such workout"})
    }

    const workout = await Workout.findById(id);

    // if document does not exist then workout will become null
    if(!workout){
        res.status(404).json({error : "No such workout"})
    }

    res.status(200).json(workout)

}

// create a new workout 
const createWorkout = async (req,res) => {
    const {title,load,reps} = req.body


    let emptyFields = []                                    // for error handling of submittiing a workout with empty fields

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error : 'Please fill in all the fields' , emptyFields})
    }

    // add document to db
    try{
        // create a new document with data from request and store the response in workout
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error : error.message})
    }
}

// delete a workout
const deleteWorkout = async (req,res) => {
    const { id } = req.params
    
    // checks if the id is in valid form
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : "no such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id : id})  // here we have _id property

    // if there is no such id
    if(!workout){
        res.status(404).json({error : "No such workout"})
    }

    res.status(200).json(workout);

}

// update a workout
const updateWorkout = async(req,res) => {
    const { id } = req.params
    
    // checks if the id is in valid form
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : "no such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id : id},{
        ...req.body                                     // to spread the properties of request object to the current object
    })

    if(!workout){
        res.status(404).json({error : "No such workout"})
    }

    res.status(200).json(workout);
}


module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}
