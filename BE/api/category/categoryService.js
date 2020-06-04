const categoryModel = require("./categoryModel");
const { convertLink } = require("../helpers/convertLink");
const postModel = require("../post/postModel");

module.exports.getAll = () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let listCategory = await categoryModel.find();
            resolve({listCategory: listCategory});
        }catch(err){
            reject(err);
        }
    })
}

module.exports.add = (name) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let link = convertLink(name);
            let category = await categoryModel.create({
                nameCategory: name,
                link: link
            });
            resolve({category: category})
        }catch(err){
            reject(err);
        }
    })
}

module.exports.update = (id,nameCategory) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let link = convertLink(name);
            let category = await categoryModel.findOne({"_id": id});
            let query = {
                ...(nameCategory && { nameCategory}),
                ...(link && { link }) 
            };
            Object.assign(category,query);
            await category.save();
            resolve({ category : category})
        }catch(err){
            reject(err);
        }
    })
}

module.exports.deleteC = (id) => {
    return new Promise(async (resolve,reject)=>{
        try{
            await categoryModel.deleteOne({"_id" : id});
            resolve({success: true, message:`Đã xóa thành công ${id}`});
        }catch(err){
            reject(err);
        }
    })
}

module.exports.getPostByCategory = async(resPerPage,page,link) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let category = categoryModel.findOne({"link": link});
            let listPost = postModel
            .find({"idCategory": category._id})
            .skip(resPerPage * page - resPerPage)
            .sort({ updatedAt: -1 })
            .limit(resPerPage);
            resolve({
                success: true,
                category: category,
                listPost: listPost
            })
         }catch(err){
           reject(err);
         }
    })
   
}
