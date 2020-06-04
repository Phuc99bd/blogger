const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    idCategory: {
        type: ObjectId,
        ref: "category"
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: Date.now
    }

})

module.exports = mongoose.model("post",postSchema);