const express = require("express");
const router = express.Router();

const cntrl = require("../controller/index");

router.post("/getAll", cntrl.getName);

module.exports = router;
