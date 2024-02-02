const express = require("express");

const orderRouter = express.Router();
const verifyToken = require("../middlewares/auth");

const {
  browse,
  readByUser,
  add,
  edit,
  destroy,
} = require("../controllers/orderControllers");

orderRouter.get("/", browse);
orderRouter.get("/user", verifyToken, readByUser);

orderRouter.post("/", add);
orderRouter.put("/:id", edit);

orderRouter.delete("/:id", destroy);

module.exports = orderRouter;
