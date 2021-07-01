import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    category:{
        type:String,
        required: true
    }, 
    color:{
        type: String,
        required: true,
        default:'white'
    }
},{
    timestamps: true
})

const Categories = mongoose.model('Categories', categoriesSchema)

export default Categories