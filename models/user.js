const {Schema,model,} = require('mongoose')
const {createHmac , randomBytes}= require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        required:true,
        default:'/images/defaultUserImage.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},{timestamps : true})

userSchema.pre('save',function(next){
    const user = this;
    

    if(!user.isModified('password')) return next();

    const salt = randomBytes(16).toString();
    // console.log(salt);
    
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
    // console.log(hashedPassword);
    

    this.salt = salt;
    this.password=hashedPassword;

    next()
})

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error('User Not Found')

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHashPassword=createHmac('sha256',salt).update(password).digest('hex');

        if(hashedPassword !== userProvidedHashPassword) throw new Error('Password Is Incorrect');

   const token = createTokenForUser(user);
   
   return token 
})

const User = model('user',userSchema)

module.exports = User