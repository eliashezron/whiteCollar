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
            isAdmin: user.isAdmin,
            profilePicture:user.profilePicture})
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
            profilePicture:user.profilePicture,
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
            profilePicture:user.profilePicture,
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

// follow a user
// route '/:id/follow
// method put
const followUser = asynchandler(async(req, res)=>{
    if(req.body.user._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.user._id)
            if(!user.followers.includes(req.body.user._id)){
                await user.updateOne({$push:{followers:req.body.user._id}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json('user has been followed')
            }else{
                res.status(403).json('you already follow this user')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('you can not follow your self')
    }
})
// unfollow a user
// route '/:id/unfollow
// method put
const unFollowUser = asynchandler(async(req, res)=>{
    if(req.body.user._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.user._id)
            if(!user.followers.includes(req.body.user._id)){
                await user.updateOne({$pull:{followers:req.body.user._id}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json('user has been unfollowed')
            }else{
                res.status(403).json('you do not follow this user')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('you can not unfollow your self')
    }
})

// view followers
// route '/friends/:id
// method get
const viewFollowers = asynchandler(async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const friends = await Promise.all(
            user.followings.map((x)=>{
                return User.findById(x)
            })
        )
        let friendlist = []
        friends.map((friend)=>{
            const{_id, userName, profilePicture} = friend
            friendlist.push({_id, userName, profilePicture})
        })
        res.status(200).json(friendlist)
    } catch (error) {
        res.status(500).json(error)
    }
})



export {getAllUsers,
        getSingleUser,
        updateUserByAdmin,
        updateUserProfile,
        deleteUser,
        adminGetSingleUser,
        viewFollowers,
        unFollowUser,
        followUser}