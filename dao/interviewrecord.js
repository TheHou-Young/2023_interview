const interviewrecordModel = require('../models/interviewrecord')
const exerciseModel = require('../models/exercise')
const { toObjectId } = require('../utils/objectid/index')
const pagination = require('../utils/pagination')

class InterviewrecordDao {
  async createRecord(recordInfo) {
    return await interviewrecordModel.create({ ...recordInfo })
  }

  async updateDeleteStatus(_id) {
    return await interviewrecordModel.findByIdAndUpdate(_id, {
      delete_status: 1,
    })
  }

  // 更新面试记录——专家上传面评
  async updateRecord({ _id, interview_evaluation }) {
    return await interviewrecordModel.findByIdAndUpdate(
      { _id },
      {
        interview_evaluation,
      },
      { new: true }
    )
  }

  // 更新面试记录——系统更新面试题目字段
  async updateExercises({ _id, interview_exercises }) {
    return await interviewrecordModel.findByIdAndUpdate(
      { _id },
      { interview_exercises },
      { new: true }
    )
  }

  // 专家获取面试记录
  async getRecordList_mas({ interview_mas, page, size }) {
    return await pagination({
      model: interviewrecordModel,
      matchPip: { interview_mas },
      listPip: [
        {
          $lookup: {
            from: 'exercises',
            localField: 'interview_exercises',
            foreignField: '_id',
            as: 'interview_exercises',
          },
        },
      ],
      options: { page, size },
    })
  }

  // 学生获取面试记录
  async getRecordList_stu({ interview_stu, page, size }) {
    return await pagination({
      model: interviewrecordModel,
      matchPip: { interview_stu },
      listPip: [
        {
          $lookup: {
            from: 'exercises',
            localField: 'interview_exercises',
            foreignField: '_id',
            as: 'interview_exercises',
          },
        },
      ],
      options: { page, size },
    })
  }

  // 学生获取面试题目
  async getExercises(_id) {
    const id = toObjectId(_id._id)
    const aggregateQuery = [
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: 'interview_exercises',
          foreignField: '_id',
          as: 'exercises',
        },
      },
    ]
    const [result] = await interviewrecordModel.aggregate(aggregateQuery)
    return result.exercises
  }
}

const interviewrecordDao = new InterviewrecordDao()

module.exports = interviewrecordDao
