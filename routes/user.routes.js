const User = require("../controllers/user.controller")
const {auth,authAdmin}  = require("../milddleware/auth.middleware")
const multer = require("multer")
const upload = multer({dest:'images/'})
const router = require("express").Router()
router.patch('/profile',auth,upload.single('profile'),User.uploadImage)
router.post("/register" , User.register)
router.post("/AddAdmin" ,authAdmin, User.AddAdmin)
router.post("/login" , User.loginUser)
router.get("/all" , User.getAllUsers)
router.get("/single",auth , User.getSingleUser)
router.post("/logoutUser" , auth , User.logoutUser)
router.post("/updateUser" , auth , User.updateUser)
router.post("/delUser" , auth , User.delUser)
router.post("/logoutAll" , auth , User.logoutAll)
router.post("/profileUSER" , auth , User.profileUSER)
router.post("/changePassword" , auth, User.changePassword)
router.patch("/activate" ,auth, User.activateUser)
router.patch("/deactivate" ,auth, User.deactivateUser)
router.patch("/changeStatus" ,auth, User.changeStatus)




module.exports = router