const postModel = require("../database/models/post.model")
const categoryModel = require("../database/models/category.model")

class Category{
    static addCategory = async (req, res)=>{
        try{
            const category = await new categoryModel(req.body)
            await category.save()
            res.status(200).send({
                apiStatus:true,
                data:category,
                message:"category added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error:e.message,
                message:"failed to add category"
            })
        }
    }
    static AllCategory = async (req, res)=>{
        try{
            const AllCategories = await categoryModel.find()
            res.status(200).send({
                apiStatus:true,
                data:AllCategories,
                message:"all categories are shown"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in show categories"
            })
        }
    }
    static editCategory = async(req,res)=>{
        try{
            const categoryData = await categoryModel.findById(req.params.id)
            categoryData.CategoryName = req.body.CategoryName           
            await categoryData.save()
            res.status(200).send({
                apiStatus:true,
                data: categoryData,
                message:"edit category sucessfully"
            })
        }
        catch(e){
           
                res.status(500).send({
                    apiStatus:false,
                    data:e.message,
                    message:"failed to edit category"
                })
       
        }
    }
    static delCategory = async(req,res)=>{
        try{
             await categoryModel.findByIdAndDelete(req.params.id)          
            res.status(200).send({
                apiStatus:true,
                message:"delete category sucessfully"
            })
        }
        catch(e){
           
                res.status(500).send({
                    apiStatus:false,
                    data:e.message,
                    message:"failed to delete category"
                })
       
        }
    }
    // static myCategory = async(req, res)=>{
    //     try{
    //         const myCategory = await categoryModel.findById(req.params.id)
    //         const posts = await new postModel.find()
    //         if(myCategory.CategoryName == posts.category) await posts.save()       
    //        res.status(200).send({
    //            apiStatus:true,
    //            message:"delete category sucessfully"
    //        })
    //    }
    //    catch(e){
          
    //            res.status(500).send({
    //                apiStatus:false,
    //                data:e.message,
    //                message:"failed to delete category"
    //            })
      
    //    }
        
    // }
    
}

module.exports = Category