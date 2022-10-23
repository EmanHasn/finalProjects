const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema( 
    {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    image : {
        type:String,
        trim:true
    },
    comments: [{
       userName:{
           type:String,
           required:true,
           trime:true
       },
       commentText:{
        type:String,
        required:true,
        trime:true
    }
      }
    ],
    likes:[
        {
            like:{
                type:String
            }
        }
    ]

},{timestamps:true})

const Post = mongoose.model("Post" , PostSchema)
module.exports = Post