const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age : {
        type:Number,
        min:21,
        max:60
    },
    gender:{
        type:String,
        trim:true,
        enum : ["male" , "female"]
    },
    email:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ("invalid Email")
        },
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    postalCode:{
        type:String,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        trim:true,
    },
    image : {
        type:String,
        trim:true
    },
    userType:{
        type:String,
        enum:["admin", "user"]
    },
    tokens : [
        {
            token :{
                type:String,
                required:true
            }
        }
    ]
   
},{timestamps:true})

UserSchema.virtual("myPosts",{
    ref:"Post",
    localField:"_id",
    foreignField:"userId"
})

UserSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.__v
    delete user._id
    delete user.password
    delete user.tokens
    return user
}
UserSchema.pre("save" , async function(){
    const user = this
    if(user.isModified("password"))
    user.password = await bcryptjs.hash(user.password , 12)
})
UserSchema.statics.userLogin = async (email , password)=> {
   const userData = await User.findOne({email})
   if(!userData) throw new Error ("invalid email")
   const isValid = await bcryptjs.compare(password , userData.password)
   if(!isValid) throw new Error ("invalid pass")
   return userData 
}
UserSchema.methods.generateToken = async function(){
   const user = this
   const token = jwt.sign( {_id: user._id} , process.env.JWTKEY)
   user.tokens = user.tokens.concat({token: token})
   await user.save()
   return token
}

const User = mongoose.model("User" , UserSchema)
module.exports = User