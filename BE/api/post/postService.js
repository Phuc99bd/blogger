const postModel = require("./postModel");
const {  convertLink } = require("../helpers/convertLink");
 
module.exports.addPost = (title,image,idCategory,description) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let link = convertLink(title);
            let post = await postModel.create({
                title: title,
                image: image,
                idCategory: idCategory,
                description: description,
                link: link
            });
            resolve({
                success: true,
                post: post
            })
        }catch(err){
            reject(err);
        }
    })
}

module.exports.updatePost = (id,title,image,idCategory,description) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let post = await postModel.findById(id);
            let query = {
                ...(title && {title}),
                ...(image && {image }),
                ...(idCategory && { idCategory}),
                ...(description && { description}),
                ...{updatedAt: Date.now()}
            }
            Object.assign(post,query);
            await post.save();
            resolve({
                success: true,
                post: post
            })
        }catch(err){
            reject(err);
        }
    })
}

module.exports.deletePost = (id) => {
    return new Promise(async (resolve,reject)=>{
        try{
            await postModel.deleteOne({"_id": id});
            resolve({
                success: true,
                message: `Xóa post thành công với id : ${id}`
            })
        }catch(err){
            reject(err);
        }
    })
}

module.exports.getPost = (resPerPage,page,keyword) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let listPost = await postModel
            .find({keyword: { $regex: new RegExp(keyword,"i")}})
            .skip(resPerPage * page - resPerPage)
            .sort({ updatedAt: -1 })
            .limit(resPerPage);
            resolve(listPost);
        }catch(err){
            reject(err);
        }
    })
}