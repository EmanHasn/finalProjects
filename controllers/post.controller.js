const postModel = require("../database/models/post.model")
class Post {
    static AddArticles = async (req, res)=>{
        try{
            const post = new postModel({
                ...req.body,
                userId:req.user._id
            })
            await post.save()
            res.status(200).send({
                apiStatus:true,
                data:post,
                message:"post added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in showAll"
            })
        }
    }

    static myPosts = async(req, res)=>{
        try{
            const postData = await req.user.populate("myPosts")
            // await req.user.populate("myPosts")
            res.status(200).send({
                apiStatus:"true",
                data:postData.myPosts,
                message:"Your Posts is shown now"
            })
        }catch(e){
            res.status(500).send({
                apiStatus:"false",
                error: e.message,
                message:"failed to show Your Posts"
            })
        }
    }
    static showAllArticles = async (req, res)=>{
        try{
            const Allposts = await postModel.find()
            res.status(200).send({
                apiStatus:true,
                data: Allposts,
                message:"Show all posts sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to Show all posts"
            })
        }
    }


    static editPost = async (req, res)=>{
        try{
            const postData = await postModel.findById(req.params.id)
            postData.title = req.body.title 
            postData.content = req.body.content
            postData.image = req.body.image          
            await postData.save()
            res.status(200).send({
                apiStatus:true,
                data: postData,
                message:"edit post sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to edit post"
            })
        }
    }
    static deletePost = async (req, res)=>{
        try{
            const post = await postModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus:true,
                message:"delete post sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to delete post"
            })
        }
    }
    static deleteAllPosts = async (req, res)=>{
        try{
             await postModel.find().remove()
            res.status(200).send({
                apiStatus:true,
                data:[],
                message:"delete post sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to delete post"
            })
        }
    }
    static AddComments = async (req, res)=>{
        try{
            const post = await postModel.findById(req.params.id)
            post.comments.push(req.body)
            await post.save()
            res.status(200).send({
                apiStatus:true,
                data:post,
                message:"comments added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to comment post"
            })
        }
    }
    static ShowAllComments = async (req, res)=>{
        try{
            const post = await postModel.findById(req.params.id)
            const allComments = post.comments
            await post.save()
            res.status(200).send({
                apiStatus:true,
                data:allComments,
                message:"comments added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to comment post"
            })
        }
    }
    static deleteAllComment = async (req, res)=>{
        try{
            const post = await postModel.findById(req.params.id)
            post.comments = []
            await post.save()
            res.status(200).send({
                apiStatus:true,
                data:post,
                message:"comments added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to comment post"
            })
        }
    }
    // static deleteSingleComment = async (req, res)=>{
    //     try{
    //         const post = await postModel.findById(req.params.id)
    //         const user = await req.user.comments
    //         user = user.filter(c=> c._id != req.body)
    //         await post.save()
    //         res.status(200).send({
    //             apiStatus:true,
    //             data:post,
    //             message:"comments added sucessfully"
    //         })
    //     }
    //     catch(e){
    //         res.status(500).send({
    //             apiStatus:false,
    //             data:e.message,
    //             message:"failed to comment post"
    //         })
    //     }
    // }
    
    static  EditComments = async (req, res)=>{
        try{
            const post = await postModel.findById(req.params.id)
            await post.save()
            res.status(200).send({
                apiStatus:true,
                data:post,
                message:"comments added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to comment post"
            })
        }
    }


}
module.exports = Post