const userModel = require("../database/models/user.model")
const fs = require("fs")
const path = require("path")
class User {
    static uploadImage = async(req,res)=>{
        try{
            const ext = path.extname(req.file.originalname)
            const newName = "images/"+req.file.fieldname+ Date.now()+ext
            fs.rename(req.file.path, newName,()=>{})
            req.user.image = newName
            await req.user.save()
            res.send({data:req.user})
        }
        catch(e){
            res.send(e.message)
        }
    }
    static register = async (req, res)=>{
        try{
            const user = new userModel(req.body)
            user.userType = "user"
            await user.save()
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error:e,
                message:"error in register"
            })
        }
    }
    static AddAdmin = async (req, res)=>{
        try{
            const user = new userModel(req.body)
            user.userType = "admin"
            await user.save()
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user added sucessfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error:e,
                message:"error in register"
            })
        }
    }
    static loginUser = async (req, res)=>{
        try{
            const user = await userModel.userLogin(req.body.email , req.body.password )
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus:true,
                data: {user,token},
                message:"login user"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error: e,
                message:e.error
            })
        }
    }
    static getAllUsers = async (req, res)=>{
        try{
            const allUsers = await userModel.find()
            res.status(200).send({
                apiStatus:true,
                data:allUsers,
                message:"all users are shown"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in show users"
            })
        }
    }
    static getSingleUser = async (req, res)=>{
        try{
            res.status(200).send({
                apiStatus:true,
                data: await req.user,
                message:"all users are shown"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in show users"
            })
        }
    }
    static activateUser = async (req, res)=>{
        try{
            // const userData = await userModel.findById(
            //     req.params.id,
            //     {status : true}
            //     )
            // res.status(200).send({
            //     apiStatus:true,
            //     data:userData,
            //     message:"status update"
            // })
            const userData = await req.user
            userData.status = true
            userData.save()
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"status update"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to update"
            })
        }
    }
    static deactivateUser = async (req, res)=>{
        try{
            // const userData = await userModel.findById(
            //     req.params.id,
            //     {status : false}
            //     )
            const userData = await req.user
            userData.status = false
            userData.save()
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"status update"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"failed to update"
            })
        }
    }
    static changeStatus = async(req,res)=>{
        try{
            const userData = await req.user
            userData.status = !userData.status
            await userData.save()
            res.status(200).send({
                apiStatus:true,
                data: userData,
                message:"status Updated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error: e.message,
                message:"failed to status Updated"
            })
        }
    }
    static logoutUser = async(req,res)=>{
        try{
            const userData = await req.user
            userData.tokens = userData.tokens.filter(t=> t.token != req.token)
            await userData.save()
            res.status(200).send({
                apiStatus:true,
                data: userData,
                message:"logout successfully "
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error: e.message,
                message:"failed to logout successfully"
            })
        }
    }
    static logoutAll = async(req,res)=>{
        try{
           req.user.tokens = []
            res.status(200).send({
                apiStatus:true,
                data: req.user.tokens,
                message:"logout all"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                error: e.message,
                message:"failed to logout all"
            })
        }
    }
    static profileUSER = async (req,res)=>{
        res.status(200).send({
            apiStatus:true,
            data:await req.user,
            message:"your profile"
        })
    }
    static changePassword = async (req,res)=>{
       try{
           const userData = await req.user
        userData.password = req.body.password
        await userData.save()
        res.status(200).send({
            apiStatus:true,
            data:userData,
            message:"password updated"
        })
       }
       catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"failed to password updated"
        })
       }

    }
    static updateUser = async (req,res)=>{
        try{
            const userData = await userModel.findByIdAndUpdate(
                req.user._id,
                req.body,
                {runValidators:true}
            )
          userData.save()
         res.status(200).send({
             apiStatus:true,
             data:userData,
             message:"user updated"
         })
        }
        catch(e){
         res.status(500).send({
             apiStatus:false,
             data:e.message,
             message:"failed to user updated"
         })
        }
 
     }
    static delUser = async (req,res)=>{
        try{
            const userData = await userModel.findByIdAndDelete(req.user._id )
         res.status(200).send({
             apiStatus:true,
             message:"user deleted"
         })
        }
        catch(e){
         res.status(500).send({
             apiStatus:false,
             data:e.message,
             message:"failed to user deleted"
         })
        }
    }

}
module.exports = User