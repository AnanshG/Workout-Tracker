const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET , {expiresIn : '3d'} )            // passing 3 parameters to sign the token -> data , secret string , metadata about token 
}


// login controller
const loginUser = async (req, res) => {
   const {email , password} = req.body

   try{
    const user = await User.login(email, password)

    // create a token 
    const token = createToken(user._id)

    res.status(200).json({email, token})
}
catch(err){
    res.status(400).json({error : err.message})
}

}


// signup controller
const signUpUser = async (req, res) => {
    const {email , password} = req.body         // destructuring an object to access its elements

    try{
        const user = await User.signup(email, password)

        // create a token 
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

module.exports = {loginUser , signUpUser}