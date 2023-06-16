const axios = require("axios");
const _ = require("lodash");
const { redisClient } = require("../config/db/redis");
const { getServiceIP } = require("../utils/ip/index");
const consulInstance = require("../middlewares/consul/index");

class AccessUserController {
  // 简单测试能否成功访问用户管理子系统
  // 严格按照分层逻辑应该属于service层，但这里只是简单测试
  // 这里使用用户管理中的 /role/options 接口来测试
  async test(req) {
    // 获取到目标服务（用户管理服务）的地址
    let url = await redisClient.get("user_manage");
    if (_.isNil(url)) url = await getServiceIP(consulInstance);
    // 构建axios实例
    const axiosInstance = axios.create({
      baseURL: url,
    });
    axiosInstance.get("/api/role/options").then((response) => {
      // 处理响应数据
      console.log(response.data.data);
      // 在控制台可以观察到从用户子系统获取到的数据 后续如何处理......
    });
  }
}

const accessUserController = new AccessUserController();

module.exports = accessUserController;
