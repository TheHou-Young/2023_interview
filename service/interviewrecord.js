const interviewrecordDao = require('../dao/interviewrecord')
const { generateRoomId } = require('../utils/room/index')
const _ = require('lodash')

class InterviewrecordService {
  // async createRecord({
  //   interview_mas,
  //   interview_stu,
  //   interview_start,
  //   interview_end,
  // }) {
  //   const roomId = generateRoomId;
  //   return await interviewrecordDao.createRecord({
  //     interview_mas,
  //     interview_stu,
  //     interview_start,
  //     interview_end,
  //     interview_room: roomId,
  //   });
  // }

  async updateDeleteStatus(_id) {
    const result = await interviewrecordDao.updateDeleteStatus(_id)
    if (_.isNil(result)) throw new Error('不允许删除不存在的题目')
    return result
  }

  // 更新面试记录——专家上传/修改面评
  async updateRecord({ _id, interview_evaluation }) {
    return await interviewrecordDao.updateRecord({
      _id,
      interview_evaluation,
    })
  }

  // 专家获取自己参与过的面试的记录
  async getRecordList_mas({ interview_mas, page, size }) {
    return await interviewrecordDao.getRecordList_mas({
      interview_mas,
      page,
      size,
    })
  }

  // 学生获取自己参与过的面试的记录
  async getRecordList_stu({ interview_stu, page, size }) {
    return await interviewrecordDao.getRecordList_stu({
      interview_stu,
      page,
      size,
    })
  }

  async getExercises(_id) {
    return await interviewrecordDao.getExercises(_id)
  }
}

const interviewrecordService = new InterviewrecordService()

module.exports = interviewrecordService
