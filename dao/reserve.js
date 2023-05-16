const reserveModel = require("../models/reserve");
const moment = require("moment");

class ReserveDao {
  async createReserve(reserveInfo) {
    return await reserveModel.create({ ...reserveInfo });
  }

  async updateDeleteStatus(_id) {
    return await reserveModel.findByIdAndUpdate({ _id }, { delete_status: 1 });
  }

  async updateReserve({ _id, reserve_start, reserve_end }) {
    return await reserveModel.findByIdAndUpdate(
      { _id },
      { reserve_start, reserve_end },
      { new: true }
    );
  }

  // 保证查询和修改的原子性
  // 加锁——同一时间只能有一个用户修改
  async updateReserveStatus(_id) {
    // const result = await reserveModel.findById(_id);
    // if (result?.reserve_status === 1) throw new Error("该面试时间已经被预定");
    return await reserveModel
      .findOneAndUpdate(
        { $and: [{ _id: _id }, { reserve_status: 0 }] },
        { reserve_status: 1 },
        { new: true, selectForUpdate: true }
      )
      .then((doc) => {
        if (!doc) {
          throw new Error("该面试时间已经被预定");
        }
      });
  }

  async getReserveById(_id) {
    return await reserveModel.findById(_id);
  }

  // 查询预约情况学生和专家分开
  // 专家
  async getReserveList_mas(conditions) {
    const query = {};
    query.reserve_account = conditions.reserve_account;
    if (conditions?.startTime)
      query.reserve_start = { $gte: startTime, $lte: endTime };
    return await reserveModel.find(query);
  }

  // 学生
  async getReserveList_stu(conditions) {
    const query = {};
    if (_.isNil(conditions.reserve_account) === false)
      query.reserve_account = conditions.reserve_account;
    if (conditions?.startTime)
      query.reserve_start = { $gte: startTime, $lte: endTime };
    return await reserveModel.find(query);
  }
}

const reserveDao = new ReserveDao();

module.exports = reserveDao;
