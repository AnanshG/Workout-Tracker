require('dotenv').config();
const express = require("express");
const cors = require('cors')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose')


// express app
const app = express();

// using cors for cross servers request
app.use(cors())

// middleware
app.use(express.json());

app.use((req,res,next)=>{          
    console.log(req.path , req.method);     
    next();
})

// routes 
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

// connect to db
mongoose.connect(process.env.MONGO)
.then(()=>{
    // listen for requests
app.listen(process.env.PORT,()=>{
    console.log("Connected to DB & Listening on port" , process.env.PORT)
})

})
.catch((err)=>{
    console.log(err)
})

