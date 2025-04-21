const {Router} = require('express')
const User = require('../models/user')


const router = Router()
 
router.get('/signup',(req,res)=>{
    return res.render('signup')
})


router.get('/signin',(req,res)=>{
    return res.render('signin')
})


router.post('/signup',async (req,res)=>{
   const {fullName , email , password}= req.body;
  
    // if(user){
    //    return res.render('signup',{user:true})
    // }

 try{
   const result= await User.create({
        fullName,
        email,
        password
   })
//    console.log(result);

 } catch(err){
    if(err.code==11000){
        return res.render('signup',{error:'User Already Registered'})
    }
    // console.log(err);
    
 }


   return res.redirect("/user/signin")

})


router.post('/signin',async (req,res)=>{
   const {email,password}= req.body;
//    console.log(email,password);
   
  try{

      const token = await  User.matchPasswordAndGenerateToken(email,password);
    //   console.log("token",token);
      
    
    return res.cookie("token",token).redirect("/")
  }catch(error){
  
    return res.render("signin",{error:error.message})
  }
 
 
 })

 router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect("/")
 })
 


module.exports = router;