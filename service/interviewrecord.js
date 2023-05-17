const interviewrecordDao = require("../dao/interviewrecord");
const { generateRoomId } = require("../utils/room/index");

class InterviewrecordService {
  async createRecord({
    interview_mas,
    interview_stu,
    interview_start,
    interview_end,
  }) {
    const roomId = generateRoomId;
    return await interviewrecordDao.createRecord({
      interview_mas,
      interview_stu,
      interview_start,
      interview_end,
      interview_room : roomId,
    });
  }
}

const interviewrecordService = new InterviewrecordService();

module.exports = interviewrecordService;
