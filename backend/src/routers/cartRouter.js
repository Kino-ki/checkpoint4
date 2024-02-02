const express = require("express");

const cartRouter = express.Router();
const verifyToken = require("../middlewares/auth");
const handleUserCart = require("../middlewares/handleUserCart");

const {
  browse,
  readByUser,
  add,
  editToOrder,
  edit,
  destroy,
} = require("../controllers/cartControllers");

cartRouter.get("/", browse);

cartRouter.post("/", verifyToken, handleUserCart, add);

cartRouter.put("/neworder/:product_id", verifyToken, editToOrder);
cartRouter.put("/:product_id", verifyToken, edit);
cartRouter.get("/usercart", verifyToken, readByUser);

cartRouter.delete("/:product_id", verifyToken, destroy);

module.exports = cartRouter;
