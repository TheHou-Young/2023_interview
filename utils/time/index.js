const moment = require("moment");

// const one_day_ms = 24 * 3600 * 1000;
// const seven_days_ms = 7 * one_day_ms;
// 判断预约的时间是否有效——至少提前一天，至多提前七天
const isValid = (current_time, reserve_start) => {
  const start = moment(current_time).add(1, "days");
  const end = moment(current_time).add(7, "days");
  switch (true) {
    case reserve_start < start:
      return "late";
    case reserve_start > end:
      return "early";
    default:
      return "valid";
  }
};

// 获取时间戳所在那天0时的时间戳
const getDate = (time) => {};

module.exports = { isValid };
