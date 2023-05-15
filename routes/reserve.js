const express = require("express");
const wrapper = require("../utils/wrapper");
const reserveController = require("../controller/reserve");

const router = express.Router();

router.post("/reserve/create", wrapper(reserveController.createReserve));
router.patch(
  "/reserve/update_reserve_status",
  wrapper(reserveController.updateReserveStatus)
);

module.exports = router;
