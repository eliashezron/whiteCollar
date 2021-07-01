import mongoose from 'mongoose'
const commentSchema = mongoose.Schema({
    name:{type:String, required:true},
    comment:{type:String, required:false},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
},{timestamps:true})

const postSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required: true,
        min: 150
    },
    image:{
        type:String,
        required: false,
    },
    category:{
        type:Array,
        required:true
    },
    comments:[commentSchema],
    numberOfComments:{
        type: Number,
        required:true,
        default:0
    },
    likes:{
        type: Array,
        default:[]
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)

export default Post