const express = require("express");

const cartRouter = express.Router();

const {
  browse,
  readByUser,
  add,
  edit,
  destroy,
} = require("../controllers/cartControllers");

cartRouter.get("/", browse);
cartRouter.get("/:user_id", readByUser);

cartRouter.post("/", add);
cartRouter.put("/:id", edit);

cartRouter.delete("/:id", destroy);

module.exports = cartRouter;
