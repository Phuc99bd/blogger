const { init,upView } = require("./viewService");
 
module.exports.init = async() => {
    await init()
}

module.exports.upView = async(req,res) => {
    await upView();
    req.status(200).send({success: true});
}