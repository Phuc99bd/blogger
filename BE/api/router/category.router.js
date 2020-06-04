const router = require("express").Router();
const { getAll,add,deleteC,update } = require("../category/categoryController");
const { authentication } = require("../middlewares/auth");

router 
    .get("/getAll",getAll)

    .post("/add",authentication,add)

    .put("/update/:id",authentication,update)

    .delete("/delete/:id",authentication,deleteC)

module.exports = router