import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min: 3,
        max:20,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        max: 50,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default: false,
    },
    profilePicture:{
        type:String,
        default:""
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type:Array,
        default:[]
    }
},{
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User