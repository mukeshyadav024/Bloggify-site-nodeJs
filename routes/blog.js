const { Router } = require('express');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'publics', 'uploads', req.user._id.toString());

        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure user-specific folder exists
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.get('/add-new', (req, res) => {
    return res.render('addBlog', { user: req.user });
});

router.post('/add-new', upload.single('coverImageUrl'), async (req, res) => {
    const { title, content } = req.body;

    try {
        const blog = await Blog.create({
            title,
            content,
            coverImageUrl: `/uploads/${req.user._id}/${req.file.filename}`,
            createdBy: req.user._id
        });
        return res.redirect(`/blog/${blog._id}`);

    } catch (err) {
        console.log(err);
        return res.render('addBlog', { error: 'Error creating blog post' });
      
    }
    
   
});

router.post('/comment/:blogId', async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            createdBy: req.user._id,
            blogId : req.params.blogId
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (err) {
        console.log(err);
        return res.redirect(`/blog/${ req.params.blogId}`);
    }
});

router.get('/:id', async (req, res) => {
   const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');
   return res.render('blog', { user: req.user, blog ,comments});
})

module.exports = router;
