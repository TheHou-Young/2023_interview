const exerciseModel = require('../models/exercise')
const _ = require('lodash')

class ExerciseDao {
  async createExercise(exerciseInfo) {
    return await exerciseModel.create({ ...exerciseInfo })
  }

  async updateDeleteStatus(_id) {
    return await exerciseModel.findByIdAndUpdate(
      _id,
      { delete_status: 1 },
      { new: true }
    )
  }

  async updateExercise({ _id, exercise_type, exercise_desc, exercise_level }) {
    return await exerciseModel.findByIdAndUpdate(
      { _id },
      { exercise_type, exercise_desc, exercise_level },
      { new: true }
    )
  }

  async findExerciseById(_id) {
    return await exerciseModel.findById(_id)
  }

  // 根据题目类型抽取出一道题
  async findExerciseByType({ exercise_type }) {
    const aggregateQuery = [
      {
        $match: {
          exercise_type: { $eq: exercise_type },
          delete_status: 0,
        },
      },
      { $sample: { size: 1 } },
    ]
    return await exerciseModel.aggregate(aggregateQuery)
  }

  async getList({ exercise_type, exercise_level, page, size }) {
    const query = {}
    query.delete_status = 0
    if (!_.isNil(exercise_type)) query.exercise_type = exercise_type
    if (!_.isNil(exercise_level)) query.exercise_level = exercise_level
    return exerciseModel
      .find(query)
      .skip((page - 1) * size)
      .limit(size)
  }
}

const exerciseDao = new ExerciseDao()

module.exports = exerciseDao
