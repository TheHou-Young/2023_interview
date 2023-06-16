const express = require("express");
const wrapper = require("../utils/wrapper");
const accessUserController = require("../controller/accessUser");

const router = express.Router();

router.get("/test/accessUser", wrapper(accessUserController.test));

module.exports = router;