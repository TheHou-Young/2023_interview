const reserveModel = require("../models/reserve");

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

  // 加锁——同一时间只能有一个用户修改
  async updateReserveStatus(_id) {
    // const result = await reserveModel.findById(_id);
    // if (result?.reserve_status === 1) throw new Error("该面试时间已经被预定");
    return await reserveModel
      .findByIdAndUpdate(
        { _id, reserve_status: 0 },
        { reserve_status: 1 },
        { new: true }
      )
      .then((doc) => {
        if (!doc) {
          throw new Error("该面试时间已经被预定");
        }
      });
  }

  async getReserveById(_id){
    return await reserveModel.findById(_id)
  }

  // 学生和专家分开
  async getReserveList_mas({ reserve_account, current_time, reserve_start }) {
    
  }

  async getReserveList_stu({ reserve_account, reserve_start }){
    const condition = {};
    if (reserve_account) condition.reserve_account = reserve_account;
    if (reserve_start) condition.reserve_start = reserve_start;
    return await reserveModel.find(condition);
  }
}

const reserveDao = new ReserveDao();

module.exports = reserveDao;
