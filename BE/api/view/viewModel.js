const mongoose =  require("mongoose");

let Schema = mongoose.Schema;

const viewSchema = new Schema({
    views: {type:Number , default: 0 },
    createdAt: {type: Number,default: Date.now}
})

module.exports= mongoose.model("view",viewSchema);