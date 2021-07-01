import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'

dotenv.config()

const cloud = cloudinary.v2
const router = express.Router()

cloud.config({
    cloud_name:'',
    api_key:'',
    api_secret:''
})

const storageImage = new CloudinaryStorage({
    cloudinary: cloud,
    params:{
        folder:'postImages',
        public_id:(req, file)=>`${file.originalname.split('.')[0]}-${Date.now()}`,
        transformation:[{width:500, height:500, crop:"limit"}]
    }
})

const storageProfilePicture = new CloudinaryStorage({
    cloudinary: cloud,
    params:{
        folder:'userProfilePictures',
        public_id:(req, file)=>`${file.originalname.split('.')[0]}-${Date.now()}`,
        transformation:[{width:750, height:200, crop:"limit"}]
    }
})

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extyname(file.originalname).toLocaleLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storageImage,
    fileFilter:function(req,file,cb){
        checkFileType(file, cb)
    }
})
const uploadPP = multer({
    storageProfilePicture,
    fileFilter:function(req,file,cb){
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res)=>{
    res.send(req.file.path)
})
router.post('/profile', uploadPP.single('image'), (req, res)=>{
    res.send(req.file.path)
})
export default router