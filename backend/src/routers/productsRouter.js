const express = require("express");

const productsRouter = express.Router();

const {
  browse,
  readById,
  readByManuf,
  editStock,
  remove,
  add,
} = require("../controllers/productsController");
const foreignKey = require("../middlewares/productForeignKeysMiddlewares");
const categoryId = require("../middlewares/categoryIdMiddleware");
const handleStock = require("../middlewares/handleStockMiddleware");

productsRouter.get("/", browse);
productsRouter.get("/:id", readById);
productsRouter.get("/:manufacturer_id", readByManuf);

productsRouter.put("/stock/:id", handleStock, editStock);
productsRouter.post("/", foreignKey, categoryId, add);

productsRouter.delete("/:id", remove);

module.exports = productsRouter;
