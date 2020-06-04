const {
    changePassword,
    initAccount,
    login,
    updateInfomation,
    getInfomation
 } = require("./adminService");
const multer = require("multer")
require("dotenv").config();

 let storageImageAvatar =
 multer.diskStorage({
     destination: (req, file, callback) => {
         callback(null, process.env.image_author);
     },
     filename: (req, file, callback) => {
         let math = process.env.image_type;
         if (math.indexOf(file.mimetype) === -1) {
             return callback("Upload fail.", null);
         }
         let imageName = `${Date.now()}-${file.originalname}`;
         callback(null, imageName);
     }

 });
let imageUploadFile =
 multer({
     storage: storageImageAvatar })
     .single("file");


module.exports.initAccount =async () => {
    await initAccount()
}

module.exports.login = async(req,res) => {
    try{
        let { email , password} =req.body;
        let data = await login(email,password);
        if(data.error)
            return res.status(data.error).send({message: data.message})
        res.status(200).send(data);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.updateInfomation = (req,res) => {
    imageUploadFile(req, res, async (error) => {
        try{
            let { fullname, description,github,work,cv,age} = req.body;
            let avatar = req.file ? req.file.filename : null;
            let data = await updateInfomation(  fullname, avatar,  description,  github,  cv, work, age);
            res.status(200).send(data);
        }catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    })  
}

module.exports.changePassword = async(req,res) => {
    try{
        let { password, passwordNew , repeatPassword } = req.body;
        let data = await changePassword(password,passwordNew,repeatPassword);
        if(data.error)
            return res.status(data.error).send(data);
        res.status(200).send(data);
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports.getInfomation = async (req,res) => {
    try{
        let user = await getInfomation();
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error);
    }
}