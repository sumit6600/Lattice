const express = require("express");
const { router } = require("../app");
const route = express.Router();

route.use("/register", require("./user.routes"));

module.exports = route;
