const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const db = require("./../../database/db");

let token;
describe("login",()=>{
    test("connect db ", done=>{
        db().then(res=>{
            done()
        })
    })
    test("Not found" , async done=>{
       request.post("/admin/login").send({
            email: "phuccog@gmail.com",
            password: "12345"
        }).then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.token).toBeTruthy()
            token = res.body.token;
            done()
        })
    },10000)
    test("Not found" ,async done=>{
        request.post("/admin/login").send({
             email: "phuccog2@gmail.com",
             password: "aaa"
         }).then(res=>{
             expect(res.status).toBe(404)
             expect(res.body.message).toBeTruthy()
             done()
         })
     },10000)
     test("Sai password" ,async done=>{
        request.post("/admin/login").send({
             email: "phuccog@gmail.com",
             password: "aaa"
         }).then(res=>{
             expect(res.status).toBe(422)
             expect(res.body.message).toBeTruthy()
             done()
         })
     },10000)
})

describe("Change Password" , ()=>{
    test("Pass current not correct",done=>{
        request.put("/admin/changePassword")
            .set({'x-access-token': token})
            .send({
            password: "123",
            passwordNew: "123",
            repeatPassword: "123"
        }).then(res=>{
            expect(res.status).toBe(404)
            expect(res.body.message).toBeTruthy()
            done()
        })
    })
    test("password K khớp",done=>{
        request.put("/admin/changePassword")
            .set({'x-access-token': token})
            .send({
            password: "12345",
            passwordNew: "123",
            repeatPassword: "1234"
        }).then(res=>{
            expect(res.status).toBe(422)
            expect(res.body.message).toBeTruthy()
            done()
        })
    })
    test("password complete",done=>{
        request.put("/admin/changePassword")
            .set({'x-access-token': token})
            .send({
            password: "12345",
            passwordNew: "12345",
            repeatPassword: "12345"
        }).then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.message).toBeTruthy()
            done()
        })
    })
})

describe("get infomation",()=>{
    test("get", done=>{
        request.get("/admin/getInfo")
        .set({'x-access-token': token})
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.user).toBeTruthy()
            done()
        })
    })

})

describe("update info", ()=>{
    test("update not image", done=>{
        request.put("/admin/updateInfo")
        .set({"x-access-token": token})
        .send({
            fullname: "Cong Phuc a",
            age: 22,
            description: "hha",
            github: "olala",
            cv: "alla",
            work: "Trum"
        })
        .then(res=>{
            expect(res.status).toBe(200)
            done();
        })
    })
    test("Image", done=>{
        request.put("/admin/updateInfo")
        .set({"x-access-token": token})
        .attach("file","public/images/author/congphuc.jpg",)
        .then(res=>{
            console.log(res.status);
            done();
        })
    })
})