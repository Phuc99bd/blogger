const app = require("../../app");
const supertest = require("supertest");
const request = supertest(app);
const db=  require("../../database/db");

describe("test add user",()=>{
    
    test("connect db",done=>{
        db().then(res=>{
            done();
        })
    })

    test("add one ",async done=>{
        request.post("/user/addUser").send({
            email: "phuccog@gmail.com"
        }).then(res=>{
            let body = res.body;
            expect(res.status).toBe(200);
            expect(body.success).toBe(true);
            done()
        })
    },10000)

    test("add two ",async done=>{
        request.post("/user/addUser").send({
            email: "phuccog@gmail.com"
        }).then(res=>{
            let body = res.body;
            expect(res.status).toBe(422);
            expect(body.error).toBeTruthy();
            done()
        })
    },10000)
})


describe("test getAllUser",()=>{
    test('get all User',done=>{
      request.get("/user/allUser")
      .then(res=>{
          expect(res.status).toBe(200);
          expect(res.body.listUser).toBeTruthy()
          done()
      })
    })
})

