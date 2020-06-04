const { addUser,getAllUser,deleteUser } = require("../user/userController");
const router = require("express").Router()

router
    .post("/addUser", addUser)

    .get("/allUser",getAllUser)

    .delete("/delete/:id",deleteUser)

module.exports = router;
