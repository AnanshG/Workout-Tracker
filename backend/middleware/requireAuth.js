const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res , next) => {
    
    // verify authorization
    const {authorization} = req.headers                                 // we can grab authorization property from the request headers

    if(!authorization){                 // checking if authorization has some value or not
        return res.status(401).json({error : "Authorization token required"})
    }


    // since authorization token string has two values like "bearer fhjewiofje.fwfawdd.dwddwd2332" but only need the 2nd part that is the signature
    const token = authorization.split(" ")[1]


    try{
        const {_id} = jwt.verify(token , process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()          // fires the next handler function 
    }
    catch(error){
        console.log(error)
        res.status(401).json({error : "Request is not authorized"})
    }
} 

module.exports = requireAuth