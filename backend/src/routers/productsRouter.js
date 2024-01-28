const express = require("express");

const productsRouter = express.Router();

const {
  browse,
  read,
  edit,
  remove,
  add,
} = require("../controllers/productsController");
const foreignKey = require("../middlewares/productForeignKeysMiddlewares");
const categoryId = require("../middlewares/categoryIdMiddleware");
const handleStock = require("../middlewares/handleStockMiddleware");

productsRouter.get("/", browse);
productsRouter.get("/:manufacturer_id", read);

productsRouter.put("/:id", handleStock, edit);
productsRouter.post("/", foreignKey, categoryId, add);

productsRouter.delete("/:id", remove);

module.exports = productsRouter;
