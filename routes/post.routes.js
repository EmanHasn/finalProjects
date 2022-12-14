const Post = require("../controllers/post.controller")
const { auth , authAdmin } = require("../milddleware/auth.middleware")
const router = require("express").Router()
router.get("/showAllArticles" , Post.showAllArticles)
router.post("/AddArticles" ,authAdmin , Post.AddArticles)
router.get("/singlePost/:id" , Post.SinglePost)
//userPosts -myposts
router.post("/myPosts",authAdmin , Post.myPosts)
router.post("/editPost/:id" , authAdmin, Post.editPost)
router.post("/deletepost/:id" ,authAdmin, Post.deletePost)
router.post("/:id/AddComments" ,auth, Post.AddComments)
router.post("/deleteAllPosts" ,authAdmin, Post.deleteAllPosts)
router.post("/:id/ShowAllComments" ,auth, Post.ShowAllComments)
router.delete("/:id/deleteAllComment" ,auth, Post.deleteAllComment)



// router.post("/:id/like", auth, Post.likeToggle)
// router.delete("/:id/deleteSingleComment", auth,Post.deleteSingleComment)
router.post("/:id/EditComments" , Post.EditComments)











module.exports = router