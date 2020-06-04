const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    nameCategory:{ type: String ,required: true ,unique: true},
    link: { type: String,required: true,unique: true },
    createdAt: {
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model("category",categorySchema)