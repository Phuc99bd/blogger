const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const db = require("../../database/db");

let token;
let id;

describe("add Post", ()=>{
    test("connect db" , done=>{
        db().then(res=>{
            done()
        })
    })

    test("login take token",done=>{
        request.post("/admin/login")
        .send({
            email: "phuccog@gmail.com",
            password: "12345"
        })
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.token).toBeTruthy()
            token = res.body.token;
            done()
        })
    })

    test("add post", done=>{
        request.post("/post/add")
        .set({"x-access-token": token})
        .field("title","Hello word")
        .field("description","alo alo")
        .field("idCategory","5e85730b99520c2d0ceda9b0")
        .attach("file","public/images/author/congphuc.jpg")
        .then(res=>{
            console.log(res.status);
            done();
        })
    })
})
