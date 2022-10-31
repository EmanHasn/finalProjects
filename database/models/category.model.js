const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema( 
    {
    CategoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    }

},{timestamps:true})

CategorySchema.virtual("myCategory",{
    ref:"Post",
    localField:"_id",
    foreignField:"category"
})

const Category = mongoose.model("Category" , CategorySchema)
module.exports = Category