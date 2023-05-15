const express = require("express");
const wrapper = require("../utils/wrapper");
const reserveController = require("../controller/reserve");

const router = express.Router();

router.post("/reserve/create", wrapper(reserveController.createReserve));
router.delete("reserve/delete", wrapper(reserveController.deleteReserve))
router.patch("/reserve/update", wrapper(reserveController.updateReserve))
router.patch(
  "/reserve/update_reserve_status",
  wrapper(reserveController.updateReserveStatus)
);

module.exports = router;
