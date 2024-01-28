const express = require("express");

const manufacturersRouter = express.Router();

const {
  browse,
  read,
  edit,
  remove,
  add,
} = require("../controllers/manufacturerController");

manufacturersRouter.get("/", browse);
manufacturersRouter.get("/:name", read);

manufacturersRouter.delete("/:id", remove);

manufacturersRouter.put("/:id", edit);

manufacturersRouter.post("/", add);

module.exports = manufacturersRouter;
