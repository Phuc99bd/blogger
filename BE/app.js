const express = require("express"),
 app = express(),
 body_parser = require("body-parser"),
 cookieParser = require('cookie-parser'),
 cors = require("cors"),
 IP_ACCESS = process.env.ACCESS_CONTROL_ORIGIN || '*',
 userRouter=  require("./api/router/user.router"),
 adminRouter = require("./api/router/admin.router"),
 categoryRouter = require("./api/router/category.router"),
 viewRouter = require("./api/router/view.router"),
 postRouter = require("./api/router/post.router");


app.use(cors({
    origin: IP_ACCESS,
    exposedHeaders: ['x-access-token']
}))

app
.use(body_parser.urlencoded({extended: false}))
.use(body_parser.json())
.use(cookieParser())
.use(express.static("./public"))

app
.use("/user",userRouter)
.use("/admin",adminRouter)
.use("/view",viewRouter)
.use("/category",categoryRouter)
.use("/post",postRouter)




module.exports= app;