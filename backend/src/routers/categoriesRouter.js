const express = require("express");

const categoriesRouter = express.Router();

const {
  browse,
  read,
  edit,
  remove,
  add,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", browse);
categoriesRouter.get("/:name", read);

categoriesRouter.post("/", add);

categoriesRouter.put("/:id", edit);

categoriesRouter.delete("/:id", remove);

module.exports = categoriesRouter;
