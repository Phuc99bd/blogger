const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");

let Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  salt: {type: String , required: true},
  hashPassword: { type: String, required: true },
  avatar: {type: String , required: true},
  description: {type: String , required: true},
  age: { type: Number , required: true},
  github: { type: String , required: true},
  cv: { type: String, required: true},
  work: { type: String, required: true},
  createdAt: { type: Number  , default: Date.now }
});

adminSchema.methods = {
    comparePassword(password){
        var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,`sha512`).toString(`hex`);
        return this.hashPassword === hash;
    },
    signJwt(){
        return jwt.sign({_id: this._id},process.env.jwt_token,{
            expiresIn: process.env.expiresIn_jwt
        })
    }
}

module.exports = mongoose.model("admin",adminSchema);