const multer = require("multer");
const { addPost,deletePost,getPost,updatePost } = require("./postService");
require("dotenv").config()

let storageImageAvatar =
 multer.diskStorage({
     destination: (req, file, callback) => {
         callback(null, process.env.image_post);
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

module.exports.addPost = (req,res) => {
    imageUploadFile(req, res, async (error) => {
        try{
            let { title,idCategory,description} = req.body;
            let image = req.file ? req.file.filename : null;
            let data = await addPost(title,image,idCategory,description);
            res.status(200).send(data);
        }catch(err){
            res.status(500).send(err);
        }
    })
}

module.exports.updatePost = (req,res) => {
    imageUploadFile(req, res, async (error) => {
        try{
            let { title,idCategory,description} = req.body;
            let image = req.file ? req.file.filename : null;
            let id = req.params.id;
            let data = await updatePost(id,title,image,idCategory,description);
            res.status(200).send(data);
        }catch(err){
            res.status(500).send(err);
        }
    })
}

module.exports.deletePost = async(req,res) => {
    try{
        let data = await deletePost(req.params.id);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}
   
module.exports.getPost = async(req,res) => {
    try{
        let resPerPage = 7;
        let page = req.query.page || 1;
        let keyword = req.query.keyword || "";
        let data = await getPost(resPerPage,page,keyword);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}