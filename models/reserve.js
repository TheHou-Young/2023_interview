const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema(
  {
    // 专家手机号
    reserve_account: {
      type: String,
      required: true,
    },
    // 专家姓名
    reserve_name: {
      type: String,
      required: true,
    },
    // 预约日期
    reserve_date: {
      type: Date,
      required: true,
    },
    // 预约时间段
    reserve_time: {
      type: String,
      enum: ["8:00-10:00", "14:00-16:00", "19:00-21:00"],
      required: true,
    },
    // 是否被预定了
    reserve_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    delete_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    created: {
      type: Number,
    },
    updated: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

const reserve = mongoose.model("reserve", reserveSchema);
module.exports = reserve;
