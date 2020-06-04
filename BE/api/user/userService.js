const userModel = require("./userModel");

exports.addUser = email => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel.findOne({ email: email });
      if (user)
        return reject("Email đã tồn tại. ^^ Cảm ơn bạn đã ủng hộ.");
      await userModel.create({ email: email });
      resolve({
        success: true,
        message:
          "Đã đăng ký thành công. Check mail thường xuyên để nhận thông báo mới nha ^^."
      });
    } catch (err) {
      reject(err);
    }
  });
};

exports.getAllUser = (resPerPage, page, keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = await userModel
        .find({ email: { $regex: new RegExp(keyword, "i") } })
        .skip(resPerPage * page - resPerPage)
        .sort({ createdAt: -1 })
        .limit(resPerPage)
        .exec();

      let count = await userModel.find({
        email: { $regex: new RegExp(keyword, "i") }
      });
      
      resolve({
          listUser: listUser,
          numOfpages: Math.ceil(count / resPerPage)
      })

    } catch (err) {
      reject(err);
    }
  });
};

exports.deleteUser = (id) => {
    return new Promise( async (resolve,reject)=>{
        try{
            await userModel.deleteOne({"_id": id});
            resolve({success: true});
        }
        catch(err){
            reject(err);
        }
    })
}
