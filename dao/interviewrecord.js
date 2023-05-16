const interviewrecordModel = require("../models/interviewrecord");

class InterviewrecordDao {
  async createRecord(recordInfo) {
    return await interviewrecordModel.create({ ...recordInfo });
  }

  async updateDeleteStatus(_id) {
    return await interviewrecordModel.findByIdAndUpdate(
      { _id },
      { delete_status: 1 }
    );
  }

  async updateRecord({ _id, interview_exercises, interview_evaluation }) {
    return await interviewrecordModel.findByIdAndUpdate(
      { _id },
      {
        interview_exercises,
        interview_evaluation,
      },
      { new: true }
    );
  }

  async getRecordList_mas({ interview_mas }) {
    return await interviewrecordModel.find({ interview_mas: interview_mas });
  }

  async getRecordList_stu({ interview_stu }) {
    return await interviewrecordModel.find({ interview_stu: interview_stu });
  }
}

const interviewrecordDao = new InterviewrecordDao();

module.exports = interviewrecordDao;
