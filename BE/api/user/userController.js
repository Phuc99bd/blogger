const { addUser, getAllUser , deleteUser } =  require("./userService");

exports.addUser = async (req, res) => {
  try {
    let { email } = req.body;
    let data = await addUser(email);
    res.status(200).send(data);
  } catch (error) {
    res.status(422).send({ error: error });
  }
};



exports.getAllUser = async (req, res) => {
  try {
      let resPerpage = 7;
      let page = req.query.page || 1;
      let keyword = req.query.keyword || "";
      let data = await getAllUser(resPerpage,page,keyword);
      res.status(200).send(data);
  } 
  catch (error) {
    res.status(500).send({ error: error });
  }
};

exports.deleteUser = async (req,res) => {
    try{
        let id = req.params.id;
        let data = await deleteUser(id);
        res.status(200).send(data);
    }
    catch(error){
        res.status(500).send({error: error});
    }
}