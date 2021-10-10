import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import auth from '../middleware/auth'

const router = express.Router()

router.post('/blog', auth, blogCtrl.createBlog)

router.get('/home/blogs', blogCtrl.getHomeBlog)

router.get('/blogs/category/:id', blogCtrl.getBlogByCategory)

router.get('/blogs/user/:id', blogCtrl.getBlogByUser)

router.get('/blog/:id', blogCtrl.getBlog)

router.put('/blog/:id', auth, blogCtrl.updateBlog)

router.delete('/blog/:id', auth, blogCtrl.deleteBlog)

router.get('/search/blogs', blogCtrl.searchBlog)

export default router