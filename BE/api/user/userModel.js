const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true},
    createdAt: { type: Number, default: Date.now }
})

module.exports = mongoose.model('user',userSchema);