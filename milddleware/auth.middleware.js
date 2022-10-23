const jwt = require("jsonwebtoken")
const userModel = require("../database/models/user.model")

const auth = async(req, res,next)=>{
    try{
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token , process.env.JWTKEY)
        const userData = await userModel.findOne({_id:decodedToken._id , 'tokens.token' :token})
        if (!userData) throw new Error("user not found")
        req.user = userData
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            error:e.message,
            message:"error from auth1"
        })
    }
}

const authAdmin = async(req, res,next)=>{
    try{
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token , process.env.JWTKEY)
        const userData = await userModel.findOne({_id:decodedToken._id , 'tokens.token' :token})
        if (!userData) throw new Error("user not found")
        if (userData.userType != "admin") throw new Error("not available")
        req.user = userData
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            error:e.message,
            message:"error from authAdmin"
        })
    }
}
module.exports = {auth , authAdmin}