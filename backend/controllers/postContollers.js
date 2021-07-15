import asynchandler from 'express-async-handler'
// import Pusher from 'pusher'
import Post from '../models/PostsModel.js'
import User from '../models/UserModel.js'

// get all posts
// method get
// route /
 const getAllPosts = asynchandler(async(req, res)=>{
     const pageSize = 9
     const page = Number(req.query.pageNumber) || 1
     const keyword = req.query.keyword ? {
        //  userAuthor:{
        //     $regex: req.query.keyword,
        //     $options:'i'
        //  },
        //  category:{
        //     $regex: req.query.keyword,
        //     $options:'i'
        //  },
         title:{
            $regex: req.query.keyword,
            $options:'i'
         },
     }:{}
     const count = await Post.countDocuments({...keyword})
     const userAuthor = req.query.userAuthor
     const category = req.query.category
     try{
     let posts;
     if(userAuthor){
        posts = await Post.find({userAuthor})
     }else if(category){
         posts = await Post.find({category:{$in:[category]}})
     }else{
         posts = await Post.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
     }
         res.status(200)
         res.json({posts, page, pages:Math.ceil(count/pageSize)})
     }catch(error){
         res.status(400).json(error)
     }
 })
// get single post
// method get
// route /:title
const getSinglePost = asynchandler(async(req, res)=>{
    const post = await Post.findById(req.params.id)
    if(post){
        res.status(200)
        res.json(post)
    }else{
        res.status(404)
        throw new Error ('post not found')
    }
})
const getSinglePostComments = asynchandler(async(req, res)=>{
    const post = await Post.findById(req.params.id)
    const{comments,...others} = post
    if(post){
        res.status(200)
        res.json({comments})
    }else{
        res.status(404)
        throw new Error ('post not found')
    }
})
// liking a post
// method put
// route '/:id/like'
const likePost = asynchandler(async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userName)){
            await post.updateOne({$push:{likes:req.body.userName}})
            res.status(200).json('the post has been liked')
        }else{
            await post.updateOne({$pull:{likes:req.body.userName}})
            res.status(200).json('the post has been disliked')
        }
    }catch(error){
        res.status(400).json(error)
    }
})
// get timeline posts
// method get
// route '/timeline/:id
const getTimelinePosts = asynchandler(async(req, res)=>{
    try{
        const currentUser = await User.findById(req.user.id)
        const userPosts = await Post.find({author:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({author: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(error){
        res.status(500).json(error)
    }
})
// get authors posts
// method get
// route '/profile/:userName
const getAuthorsPosts = asynchandler(async(req, res)=>{
    try{
        const user = await User.findOne(req.params.id)
        const posts = await Post.find({author:user._id}) 
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json(err)
    }
})
// comment on a post
// method put
// route '/post/:id/comment

const postComments = asynchandler(async(req, res)=>{
    const postCommentsArray = await Post.find({comments:{$in: [req.params.userName]}})
    
    if(postCommentsArray){
        res.json(postCommentsArray)
    }else{
        res.status(400).json('comments not found')
    }
})
const commentOnPost = asynchandler(async(req, res)=>{
//  const pusher = new Pusher ({  
// app_id : "1234215",
// key : "a09580bb76b0d8c97e6c",
// secret : "172bb0a44701f8ba18c3",
// cluster : "mt1",
// encrypted: true
// })
   try {
       const{ comment} = req.body
    const post = await Post.findById(req.params.id)
        if(post){
            const userComment = {
            userName:req.user.userName,
            comment,
            user:req.user._id
            }
            post.comments.push(userComment)
            post.numberOfComments = post.comments.length
            // pusher.trigger('flash-comments', 'new-comment', userComment)
            await post.save()
            res.status(201).json({message:'Comment added'})
        }else{
            res.status(400).json('post not found')
        }
   } catch (error) {
       res.status(400)
       res.json(error)
   }
    
})

// create a post
// method post
// route /create
 const createPost = asynchandler(async(req, res)=>{
     const post = new Post({
        title: req.body.title,
        userAuthor:req.user.userName,
        description:req.body.description,
        author: req.user._id,
        image:req.body.image,
        category:req.body.category
     })
     const titleAlreadyExists = await Post.findOne({title:req.body.title})
     if(titleAlreadyExists){
         res.status(400).json({message: 'title already exists'})
     }else{
    const createdPost = await post.save()
     res.status(200).json(createdPost)
     }

 })
// update post
// method put
// route /edit
const updatePost = asynchandler(async(req, res)=>{
    const post = await Post.findById(req.params.id)
    if(post.author.toString() === req.user._id.toString()){
        const updatedpost = await Post.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true})
            res.status(200).json(updatedpost)
        }else{
        res.status(400)
        throw new Error ('post can only be updated by author')
    }
})

// delete post
// methode delete
// route /delete
const deletePost = asynchandler(async(req, res)=>{
    const post = await Post.findById(req.params.id)
    if(post.author.toString() === req.user._id.toString()){
        await post.remove()
        res.status(200)
        res.json('post deleted successfully')
    }else{
        res.status(400)
        throw new Error('post can only be deleted by author')
    }
})
// get top posts
// route /top
// method top
const getTopPosts = asynchandler(async(req, res)=>{
    const topPosts = await Post.find({}).sort({likes: -1}).limit(5)
    res.json(topPosts)
})

export { getAllPosts,
        getTopPosts,
        getSinglePost,
        deletePost,
        createPost,
        updatePost,
        commentOnPost,
        likePost,
        getAuthorsPosts,
        getTimelinePosts,
        getSinglePostComments,
        postComments}


