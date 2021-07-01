import express from 'express'
import { getAllPosts, getTopPosts, getSinglePost, deletePost, createPost, updatePost } from '../controllers/postContollers.js'
import {protect, admin} from '../middleware/authMiddeleware.js'


const router = express.Router()
router.get('/', getAllPosts)
router.get('/:id', getSinglePost)
router.get('/trendingposts', getTopPosts)
router.post('/create', protect, createPost)
router.put('/:id',protect,updatePost)
router.delete('/:id', protect, deletePost)

export default router

