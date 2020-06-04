const supertest = require("supertest");
const app = require("../../app");
const db = require("../../database/db");
const request = supertest(app);

let token,
    id

describe("add Job", ()=>{
    test("connect db",done=>{
        db().then(res=>{
            done()
        })
    })

    test("take token", done=>{
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

    test("add category", done=>{
        request.post("/category/add")
        .set({"x-access-token": token})
        .send({
            nameCategory: "Mongodb"
        })
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.category).toBeTruthy()
            id = res.body.category._id;
            done()
        })
    })
})

describe("get all",()=>{
    test("get ",done=>{
        request.get("/category/getAll")
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.listCategory).toBeTruthy()
            done()
        })
    })
})

describe("update",()=>{
    test("update part one", done=>{
        request.put(`/category/update/5e85730b99520c2d0ceda9b0`)
        .send({nameCategory: "ReactJs"})
        .set({"x-access-token": token})
        .then(res=>{
            expect(res.status).toBe(200);
            expect(res.body.category).toBeTruthy()
            done()
        })
        
    })
})

describe("delete",()=>{
    test("delete One",done=>{
        request.delete(`/category/delete/${id}`)
        .set({"x-access-token": token})
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body.message).toBeTruthy()
            done()
        })
    })
})