const express = require("express");

const loginRouter = express.Router();

const { login } = require("../controllers/loginControllers");

loginRouter.post("/", login);

module.exports = loginRouter;
