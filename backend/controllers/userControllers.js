import User from "../models/UserModel.js"
import asynchandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js"
// get all users
// route '/'
// access private/admin
// method get
const getAllUsers = asynchandler(async(req, res) =>{
    const users = await User.find({})
    res.status(200).json(users)
})

// get single user
// route '/profile'
// method get
const getSingleUser = asynchandler(async(req, res) => {
    const  user = await User.findById(req.user._id)
    if(user){
        res.status(200)
        res.json({
            _id:user._id,
            userName: user.name,
            email:user.email,
            isAdmin: user.isAdmin,})
    }else{
        res.status(404)
        throw new Error('User not found')
    }

})
// get single user
// route '/:id'
// method get
const adminGetSingleUser = asynchandler(async(req, res) => {
    const  user = await User.findById(req.params.id).select('-password')
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }

})

// update user by admin
// route '/:id
// method put
const updateUserByAdmin = asynchandler(async(req, res)=>{
   const user = await User.findById(req.params.id)

    if(user){

        user.isAdmin = req.body.isAdmin || user.isAdmin
        
         const updatedUser = await user.save()
            res.status(200).json({
            _id:updatedUser._id,
            userName: updatedUser.userName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
    })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
// update user profile
// route '/profile'
// method put
const updateUserProfile = asynchandler(async(req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        user.userName = req.body.userName || user.userName
        user.emai = req.body.emai|| user.email 
        if(req.body.password){
            user.password = req.body.password
        }
         const updatedUser = await user.save()
        res.status(200)
        res.json({
            _id:updatedUser._id,
            userName: updatedUser.userName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
    })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// delete user
// route '/:id'
// method delete
const deleteUser = asynchandler(async(req, res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'user removed'})
    }else{
        res.status(404)
        throw new Error ('user not found')
    }
})

export {getAllUsers, getSingleUser, updateUserByAdmin,updateUserProfile,deleteUser,adminGetSingleUser}