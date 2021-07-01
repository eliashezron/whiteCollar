import asynchandler from 'express-async-handler'
import Categories from '../models/CategoriesModel.js'

// create category
// method post
// route /create

const createCategory = asynchandler(async(req, res)=>{
    const {category, color} = req.body
    const categoryExists = await Categories.findOne({category, color})

    if(categoryExists){
        res.status(200).json({message:'category or color already exists'})
    }
    const category = await Categories.create({category, color})
    if(category){
        res.status(200).json(category)
    }else{
        res.status(400)
        res.json({message:'failed to create category'})
    }
})

const deleteCategory = asynchandler(async(req,res)=>{
    const category = await Categories.findById(req.params.id)
    if(category){
        res.status(200).json({message:'category deleted succesfully'})
    }else{
        res.status(400).json({message:'category not found'})
    }
})