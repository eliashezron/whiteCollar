import asynchandler from 'express-async-handler'
import Post from '../models/PostsModel.js'

// get all posts
// method get
// route /
 const getAllPosts = asynchandler(async(req, res)=>{
     const pageSize = 9
     const page = Number(req.query.pageNumber) || 1
     const keyword = req.query.keyword ? {
         author:{
            $regex: req.query.keyword,
            $options:'i'
         },
         category:{
            $regex: req.query.keyword,
            $options:'i'
         },
         title:{
            $regex: req.query.keyword,
            $options:'i'
         },
     }:{}
     const count = await Post.countDocuments({...keyword})
     const author = req.query.author
     const category = req.query.category
     try{
     let posts;
     if(author){
        posts = await Post.find({author, ...keyword}).limit(pageSize).skip(pageSize * (page -1))
     }else if(category){
         posts = await Post.find({categories:{$in:[category, ...keyword]}}).limit(pageSize).skip(pageSize * (page -1))
     }else{
         posts = await Post.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
     }
         res.status(200)
         res.json({posts, page, pages:Math.ceil(count/pageSize)})
     }catch(error){
         res.status(400).json(error)
     }
 })
// filter post by created at date
// method get
// route/:filter

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
// filter posts by category
// method get
// route /query?=cat

// liking a post
// method put
// route 

// create a post
// method post
// route /create
 const createPost = asynchandler(async(req, res)=>{
     const post = new Post({
        title: req.body.title,
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

export { getAllPosts, getTopPosts, getSinglePost, deletePost, createPost, updatePost}










// const createNewPost = asynchandler(async(req, res)=>{
//     const {title, image, description, category, image } = req.body

//     const titleExists = Post.findOne({title})
//     if(titleExists){
//         res.status(400)
//         throw new Error ('title already exists')
//     }
//     const post = Post.create({title, image, description, category ,image })
//     if(post){
//         res.status(200)
//         res.json({
//             _id:post._id,
//             title:post.title,
//             description:post.description,
//             category:post.category,
//             image:post.image
//         })
//     }
// })