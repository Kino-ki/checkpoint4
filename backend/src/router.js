const express = require("express");

const router = express.Router();
const productsRouter = require("./routers/productsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const manufacturerRouter = require("./routers/manufacturersRouter");
const cartRouter = require("./routers/cartRouter");
const userRouter = require("./routers/userRouter");
const loginRouter = require("./routers/loginRouter");

/* ************************************************************************* */
// Define Your API Routes Here
router.use("/login", loginRouter);
router.use("/carts", cartRouter);
router.use("/users", userRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/manufacturers", manufacturerRouter);
/* ************************************************************************* */

/* ************************************************************************* */

module.exports = router;
