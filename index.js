const dotenv = require('dotenv');
dotenv.config()

const express = require('express')
const path= require('path')
const userRoute= require('./routes/user')
const blogRoute= require('./routes/blog')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthentication } = require('./middleware/authentication')
const Blog = require('./models/blog')

const app = express()
const PORT = process.env.PORT || 5000
const DB = process.env.DB_URL || 'mongodb://localhost:27017/bloggify';

mongoose.connect(DB).then(()=>{
    console.log('MongoDb Connected Successfully');
    
})

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication('token'))
app.use(express.static(path.resolve('./publics')));


app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({}).populate('createdBy')

    res.render("home",{user:req.user,blogs:allBlogs})
})

app.use('/user',userRoute)

app.use('/blog', blogRoute)

app.listen(PORT,()=>{
    console.log(`Server listen At Port ${PORT}`);
    
})

