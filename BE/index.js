const app = require("./app");
const http = require("http");
const db = require("./database/db");
require("dotenv").config();
const { init } = require("./api/view/viewController");
const {initAccount } = require("./api/admin/adminController");

db()
.then(res=>{
    let server = http.createServer(app);
    server.listen(process.env.APP_PORT);
    init();
    initAccount();
    console.log(`Running on port ${process.env.APP_PORT}`);
    
})
.catch(err=>{
    console.log(err);
    
})
