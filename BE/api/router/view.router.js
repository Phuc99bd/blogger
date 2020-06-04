const router = require("express").Router();
const { upView } = require("../view/viewController");

router
    .get("/upView",upView)

module.exports= router;