const { getAll,add,deleteC,update,getPostByCategory } = require("./categoryService")

module.exports.getAll = async(req,res) => {
    try{
        let data = await getAll();
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.add = async(req,res) => {
    try{
        let { nameCategory } = req.body;
        let data = await add(nameCategory);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.update = async(req,res) => {
    try{
        let id = req.params.id;
        let { nameCategory } = req.body;
        let data = await update(id,nameCategory);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.deleteC = async(req,res) => {
    try{
        let id = req.params.id;
        let data = await deleteC(id);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.getPostByCategory = async(req,res) => {
    try{
        let resPerpage = 7;
        let page = req.query.page || 1;
        let link = req.params.link;
        let data = await getPostByCategory(resPerpage,page,link);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send(err);
    }
}