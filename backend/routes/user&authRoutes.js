import express from 'express'
import { loginUser, registerUser } from '../controllers/authContollers.js'
import { adminGetSingleUser, deleteUser, getAllUsers, getSingleUser, updateUserByAdmin, updateUserProfile } from '../controllers/userControllers.js'
import {protect, admin} from '../middleware/authMiddeleware.js'


const router = express.Router()
router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/', getAllUsers)
router.get('/profile', protect, getSingleUser)
router.put('/profile', protect, updateUserProfile)
router.get('/:id', protect, admin, adminGetSingleUser)
router.put('/:id', protect, admin, updateUserByAdmin)
router.delete('/:id', protect, admin, deleteUser)

export default router