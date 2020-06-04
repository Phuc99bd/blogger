const adminModel=  require("../admin/adminModel");
const {verifyToken} = require("../helpers/verifyToken");

exports.authentication = async (req,res,next) => {
    let tokenKey = req.headers['x-access-token']
    try{
        let decored = await verifyToken(tokenKey);
        let user = await adminModel.findById(decored._id)
        if(user)
            return next()
        res.status(403).send({message: "unauthorized"});
    }catch(error){
        throw error
    }
}
  