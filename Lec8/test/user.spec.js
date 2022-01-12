const app = require("../index");

const request = require("supertest");
const { expect } = require("chai");
const { User } = require("../models");

describe("GET /users 는", () => {
  describe("성공시, ", () => {
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          expect(res.body).be.instanceOf(Array);
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다 ", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          expect(res.body).be.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시, ", () => {
    it("limit이 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app)
        .get("/users?limit=two")
        .end((err, res) => {
          expect(res.statusCode).eq(400);
          done();
        });
    });
  });
});

describe("GET /users/:id 는", () => {
  describe("성공시, ", () => {
    it("id에 맞는 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          expect(res.body.id).eq(1);
          done();
        });
    });
  });

  describe("실패시, ", () => {
    it("id가 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app)
        .get("/users/two")
        .end((err, res) => {
          expect(res.statusCode).eq(400);
          done();
        });
    });
    it("id로 유저를 찾을 수 없는 경우 404로 응답한다.", (done) => {
      request(app)
        .get("/users/4")
        .end((err, res) => {
          expect(res.statusCode).eq(404);
          done();
        });
    });
  });
});

describe("DELETE /users 는", () => {
  describe("성공시, ", () => {
    it("id에 맞는 유저 객체를 삭제한다.", (done) => {
      request(app)
        .delete("/users")
        .type("application/json")
        .send({ id: 1 })
        .end((err, res) => {
          expect(res.statusCode).eq(204);
          done();
        });
    });
  });

  describe("실패시, ", () => {
    it("id가 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app)
        .delete("/users")
        .send({ id: "one" })
        .end((err, res) => {
          expect(res.statusCode).eq(400);
          done();
        });
    });
    it("id로 유저를 찾을 수 없는 경우 404로 응답한다.", (done) => {
      request(app)
        .delete("/users")
        .send({ id: 4 })
        .end((err, res) => {
          expect(res.statusCode).eq(404);
          done();
        });
    });
  });
});

describe("POST /users 는", () => {
  describe("성공시, ", () => {
    it("새로운 유저를 추가한다.", (done) => {
      request(app)
        .post("/users")
        .type("application/json")
        .send({ id: 4, name: "newUser" })
        .end((err, res) => {
          expect(res.statusCode).eq(201);
          expect(res.body).to.haveOwnProperty("id");
          expect(res.body).to.haveOwnProperty("name");
          done();
        });
    });
  });

  describe("실패시, ", () => {
    it("name 누락시 400을 반환한다. ", (done) => {
      request(app)
        .post("/users")
        .send({ id: 5 })
        .end((err, res) => {
          expect(res.statusCode).eq(400);
          done();
        });
    });
    it("name이 중복일 경우 409를 반환한다. ", (done) => {
      request(app)
        .post("/users")
        .send({ id: 6, name: "newUser" })
        .end((err, res) => {
          expect(res.statusCode).eq(409);
          done();
        });
    });
  });
});

describe("PUT /users 는", () => {
  describe("성공시, ", () => {
    it("변경된 name을 응답한다.", (done) => {
      request(app)
        .put("/users")
        .type("application/json")
        .send({ id: 3, name: "updateUser" })
        .end((err, res) => {
          expect(res.statusCode).eq(200);
          expect(res.body.id).eq(3);
          expect(res.body.name).eq("updateUser");
          done();
        });
    });
  });

  describe("실패시, ", () => {
    it("정수가 아닌 id일 경우 400을 응답한다. ", (done) => {
      request(app)
        .put("/users")
        .send({ id: "three", name: "updateUser1" })
        .end((err, res) => {
          expect(res.statusCode).eq(400);
          done();
        });
    });
    it("name이 없을 경우 400을 응답한다. ", (done) => {
      request(app)
        .put("/users")
        .send({ id: 3 })
        .end((err, res) => {
          expect(res.statusCode).eq(400);
          done();
        });
    });
    it("없는 유저일 경우 404을 응답한다. ", (done) => {
      request(app)
        .put("/users")
        .send({ id: 10, name: "updateUser2" })
        .end((err, res) => {
          expect(res.statusCode).eq(404);
          done();
        });
    });
    it("이름이 중복일 경우 409를 응답한다. ", (done) => {
      request(app)
        .put("/users")
        .send({ id: 3, name: "newUser" })
        .end((err, res) => {
          expect(res.statusCode).eq(409);
          done();
        });
    });
  });
});
