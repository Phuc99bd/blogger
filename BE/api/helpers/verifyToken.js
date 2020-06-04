require("dotenv").config()
const jwt = require("jsonwebtoken");

module.exports.verifyToken = (tokenKey) => {
    return new Promise((resolve,reject)=>{
       jwt.verify(tokenKey,process.env.jwt_token,(err,decoded)=>{
            if(err)
                reject(err)
            resolve(decoded);
        })

    })
}