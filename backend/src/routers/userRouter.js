const express = require("express");

const userRouter = express.Router();
const userVerification = require("../middlewares/UserVerification");
const hash = require("../middlewares/hashPassword");
const verifyToken = require("../middlewares/auth");

const {
  browse,
  readByUser,
  add,
  edit,
  destroy,
} = require("../controllers/userControllers");

userRouter.get("/", browse);
userRouter.get("/profile", verifyToken, readByUser);
userRouter.post("/", userVerification, hash, add);
userRouter.put("/:id", edit);

userRouter.delete("/:id", destroy);

module.exports = userRouter;
