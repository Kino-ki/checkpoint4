const express = require("express");

const cartRouter = express.Router();
const verifyToken = require("../middlewares/auth");

const {
  browse,
  readByUser,
  add,
  edit,
  destroy,
} = require("../controllers/cartControllers");

cartRouter.get("/", browse);
cartRouter.get("/usercart", verifyToken, readByUser);

cartRouter.post("/", verifyToken, add);
cartRouter.put("/:id", edit);

cartRouter.delete("/:id", destroy);

module.exports = cartRouter;
