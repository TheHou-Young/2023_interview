const reserveService = require("../service/reserve");

class ReserveController {
  async createReserve(req) {
    const {
      current_time,
      reserve_account,
      reserve_name,
      reserve_start,
      reserve_end,
    } = req.body;
    return await reserveService.createReserve(
      { current_time },
      { reserve_account, reserve_name, reserve_start, reserve_end }
    );
  }

  async updateReserveStatus(req) {
    const { current_time, _id } = req.body;
    return await reserveService.updateReserveStatus({ current_time }, _id);
  }
}

const reserveController = new ReserveController();

module.exports = reserveController;