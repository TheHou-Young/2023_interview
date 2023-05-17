const interviewrecordDao = require("../dao/interviewrecord");
const { generateRoomId } = require("../utils/room/index");
const _ = require("lodash")

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
    const result = await interviewrecordDao.updateDeleteStatus(_id);
    if (_.isNil(result)) throw new Error("不允许删除不存在的题目");
    return result;
  }

  async updateRecord({ _id, interview_evaluation }) {
    return await interviewrecordDao.updateRecord({
      _id,
      interview_evaluation,
    });
  }

  async getRecordList_mas({ interview_mas }) {
    return await interviewrecordDao.getRecordList_mas({ interview_mas });
  }

  async getRecordList_stu({ interview_stu }) {
    return await interviewrecordDao.getRecordList_stu({ interview_stu });
  }

  async getExercises(_id){
    return await interviewrecordDao.getExercises(_id)
  }
}

const interviewrecordService = new InterviewrecordService();

module.exports = interviewrecordService;
