// Express 에서 제공하는 전용 Router Class 가 존재
// Router Class 를 사용하면 모듈식 마운팅이 가능한 핸들러를 작성할 수 있다.

const express = require("express");
const {
  getOneUser,
  getAllUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} = require("./user.ctrl");
const router = express.Router();

router.get("/", getAllUser);

router.get("/:id", getOneUser);

router.post("/", createOneUser);

router.put("/", updateOneUser);

router.delete("/", deleteOneUser);

module.exports = router;
