const router = require("express").Router();
const { addPost,deletePost,getPost,updatePost } = require("../post/postController");
const { authentication} = require("../middlewares/auth");

router
    .post("/add",authentication,addPost)

    .get("/getPost",getPost)

    .put("/update/:link",authentication, updatePost)

    .delete("/delete/:link",authentication, deletePost)

module.exports = router;