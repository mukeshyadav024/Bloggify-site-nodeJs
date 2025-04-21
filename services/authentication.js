const dotenv = require('dotenv')
dotenv.config()


const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET

function createTokenForUser(user){
    // console.log(user);
    
    const payload={
        _id:user._id,
        email:user.email,
        fullName:user.fullName,
        role:user.role,
        profileImageUrl: user.profileImageUrl,
    }

    const token = JWT.sign(payload,secret)

    return token 
    
}

function validateToken(token){
    const payload=JWT.verify(token,secret)

    return payload;
}

module.exports={
    createTokenForUser,
    validateToken
}