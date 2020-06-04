const adminModel = require("./adminModel");
const crypto = require("crypto");
require("dotenv").config();

module.exports.initAccount = async () => {
  let check = await adminModel.findOne();
  if (!check) {
    let { salt, hash } = randomSaltAndPassword(process.env.AC_PASSWORD);
    let account = {
      fullname: `Công Phúc`,
      email: `phuccog@gmail.com`,
      avatar: `congphuc.jpg`,
      salt: salt,
      hashPassword: hash,
      description: `I am Web Developer. Currently is student third-year at university TDMU. Desire to find a working
            environment to learn`,
      github: `https://github.com/Phuc99bd`,
      cv: `https://phuc99bd.github.io/cv/`,
      work: `Student third-year`,
      age: 21
    };
    await adminModel.create(account);
  }
};

module.exports.updateInfomation = async (
    fullname, avatar,  description,  github,  cv, work, age
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await adminModel.findOne({},{hashPassword: 0});
      let query = {
        ...(fullname && { fullname }),
        ...(avatar && { avatar }),
        ...(description && { description }),
        ...(github && { github }),
        ...(cv && { cv }),
        ...(work && { work }),
        ...(age && {age})
      };
      Object.assign(user, query);
      await user.save();
      resolve({ user: user });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.changePassword = (
  passwordCurrent,
  passwordNew,
  repeatPassword
) => {
  return new Promise(async (resolve, reject) => {
    try{
        let user = await adminModel.findOne();
        if (!user.comparePassword(passwordCurrent))
          return resolve({
            error: 404,
            message: "Mật khẩu hiện tại không chính xác."
          });
        if (passwordNew !== repeatPassword)
          return resolve({
            error: 422,
            message: "Mật khẩu mới không trùng khớp."
          });
        let { salt, hash } = randomSaltAndPassword(passwordNew);
   
        await adminModel.updateOne({ _id: user._id }, { salt: salt, hashPassword: hash })
    
        resolve({ success: true, message: "Đổi mật khẩu thành công." });
    }catch(err){
        reject(err);
    }

  });
};

module.exports.login = (email,password) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let user = await adminModel.findOne({email: email})
            if(!user)
                return resolve({
                    error: 404,
                    message: "Sai tài khoản và mật khẩu"
                })
            if(!user.comparePassword(password))
                return resolve({
                    error: 422,
                    message: "Sai tài khoản và mật khẩu"
                })
            resolve({
                success: true,
                token: user.signJwt()
            })
        }catch(err){
            reject(err)
        }
    })
}

const randomSaltAndPassword = password => {
  let salt = crypto.pseudoRandomBytes(16).toString("hex"),
    hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString("hex");
  return { salt: salt, hash: hash };
};


module.exports.getInfomation = () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let user = await adminModel.findOne({},{hashPassword: 0});
            resolve({user: user});
        }catch(error){
            reject(error);
        }
    })
}