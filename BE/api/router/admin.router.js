const router = require("express").Router();
const {authentication } = require("../middlewares/auth")
const { 
    getInfomation,
    changePassword,
    login,
    updateInfomation
} = require("../admin/adminController");

router
    .get("/getInfo",authentication,getInfomation)

    .post("/login",login)

    .put("/changePassword",authentication,changePassword)

    .put("/updateInfo",authentication,updateInfomation)

module.exports = router;