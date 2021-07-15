import express from 'express'
import { getAllPosts, getTopPosts,commentOnPost, getSinglePost, deletePost, createPost, updatePost, likePost, postComments, getSinglePostComments } from '../controllers/postContollers.js'
import {protect, admin} from '../middleware/authMiddeleware.js'


const router = express.Router()
router.get('/', getAllPosts)
router.post('/create', protect, createPost)
router.get('/:id', getSinglePost)
router.get('/:id/comments', getSinglePostComments)
router.put('/:id',protect,updatePost)
router.delete('/:id', protect, deletePost)
router.post('/:id/comments',protect,commentOnPost)
router.put('/:id/likes',protect,likePost)
router.get('/trending/:trending', getTopPosts)
 


export default router

