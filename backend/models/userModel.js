const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
})

// static signup method
userSchema.statics.signup = async function(email , password){           // we cannot use arrow function when we need to use this keyword , so we have use regular function

    if(!email || !password){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not correct")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong")
    }


    const exists = await this.findOne({ email })        // using this keyword to access the User model in file as it is created here

    if(exists){
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)                     // bcrypt is a node module used for encryption , we are using salt which adds a extra layer to our password which making it more secure , here we have value of salt 10 , greater the value of salt more will be its security but will also take more time for users to signup

    const hash = await bcrypt.hash(password , salt);         // used for encrption joins password and salt

    const user = await this.create({email , password : hash})       // since email is same , but we are changing value of password with encryption to make it more secure and prevent getting hackers to access the password during data breach
    return user
}

// static login method
userSchema.statics.login = async function(email , password){

    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })        // using this keyword to access the User model in file as it is created here

    if(!user){
        throw Error('Invalid Email')
    }

    const comp = await bcrypt.compare(password , user.password)

    if(!comp){
        throw Error("Invalid password")
    }

    return user

} 

module.exports = mongoose.model('User',userSchema)