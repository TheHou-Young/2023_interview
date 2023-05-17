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

  // 更新面试记录——系统更新面试题目字段、专家上传面评
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

  // 专家获取面试记录
  async getRecordList_mas({ interview_mas }) {
    return await interviewrecordModel.find({ interview_mas: interview_mas });
  }

  // 学生获取面试记录
  async getRecordList_stu({ interview_stu }) {
    return await interviewrecordModel.find({ interview_stu: interview_stu });
  }

  // 学生获取面试题目
  async getExercises({ _id }) {
    const aggregateQuery = [
      {
        $match: {
          _id: { $eq: _id },
        },
      },
      {
        $lookup: {
          from: "exercises",
          localField: "interview_exercises",
          foreignField: "_id",
          as: "exercises",
        },
      },
    ];
    return await interviewrecordModel.aggregate(aggregateQuery)
  }
}

const interviewrecordDao = new InterviewrecordDao();

module.exports = interviewrecordDao;
