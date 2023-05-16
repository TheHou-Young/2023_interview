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

  async deleteReserve(req) {
    const _id = req.query;
    return await reserveService.updateDeleteStatus(_id);
  }

  async updateReserve(req) {
    const { _id, reserve_start, reserve_end } = req.body;
    return await reserveService.updateReserve({
      _id,
      reserve_start,
      reserve_end,
    });
  }

  async updateReserveStatus(req) {
    const { current_time, _id } = req.body;
    return await reserveService.updateReserveStatus({ current_time, _id });
  }

  async getReserve(req) {
    const _id = req.query;
    return await reserveService.getReserveById(_id);
  }

  async getReserveList_mas(req) {
    const { reserve_account, reserve_date } = req.body;
    return await reserveService.getReserveList_mas({
      reserve_account,
      reserve_date,
    });
  }

  async getReserveList_stu(req) {
    const { reserve_account, reserve_date } = req.body;
    return await reserveService.getReserveList_stu({
      reserve_account,
      reserve_date,
    });
  }
}

const reserveController = new ReserveController();

module.exports = reserveController;
