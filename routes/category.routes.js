const Category = require("../controllers/category.controller")
// const Post = require("../controllers/post.controller")
const { auth , authAdmin } = require("../milddleware/auth.middleware")
const router = require("express").Router()
router.post("/add" ,authAdmin, Category.addCategory)
router.get("/showAll" ,auth, Category.AllCategory)
router.post("/edit/:id" ,authAdmin, Category.editCategory)
router.delete("/delete/:id" , authAdmin , Category.delCategory)
// router.post("/myCategory/:id",auth , Category.myCategory)









module.exports = router