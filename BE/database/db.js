const  mongoose=require("mongoose");
require('dotenv').config()

let connectDB = () => {
    let URI =`${process.env.DB_connection}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    console.log(URI);
    // let URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-ult3f.mongodb.net/${process.env.DB_CLOUD}?retryWrites=false&w=majority`
    return mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
}
module.exports = connectDB;