const express = require("express");
const router = express.Router();

const reservasRouter = require("./reservas.router");

router.use("/reservas", reservasRouter);

module.exports = router;