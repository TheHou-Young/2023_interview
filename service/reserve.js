const reserveDao = require("../dao/reserve");
const { isValid } = require("../utils/time/index");

class ReserveService {
  async createReserve({ current_time }, reserveInfo) {
    const reserve_start = reserveInfo?.reserve_start;
    const result = isValid(current_time, reserve_start);
    switch (true) {
      case result === "late":
        throw new Error("至少提前一天发布预约，请重新选择时间！");
      case result === "early":
        throw new Error("至多提前七天发布预约，请重新选择时间！");
      default:
        break;
    }
    return await reserveDao.createReserve({
      ...reserveInfo,
    });
  }

  async updateDeleteStatus(_id) {
    const result = await reserveDao.updateDeleteStatus(_id);
    if (_.isNil(result)) throw new Error("不允许删除不存在的预约记录");
    return result;
  }

  async updateReserve({ _id, reserve_start, reserve_end }) {
    return await reserveDao.updateReserve({ _id, reserve_start, reserve_end });
  }

  // TODO——成功预约则create面试记录
  async updateReserveStatus({ current_time, _id }) {
    const reserve_start = await reserveDao.getReserveById(_id).reserve_start;
    const result = isValid(current_time, reserve_start);
    switch (true) {
      case result === "late":
        throw new Error("至少提前一天进行预约，请重新选择时间！");
      case result === "early":
        throw new Error("至多提前七天进行预约，请重新选择时间！");
      default:
        break;
    }
    return await reserveDao.updateReserveStatus(_id);
  }
}

const reserveService = new ReserveService();

module.exports = reserveService;
