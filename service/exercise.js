const exerciseDao = require("../dao/exercise");
const async = require('async');
const _ = require("lodash");

class ExerciseService {
  async createExercise(exerciseInfo) {
    return await exerciseDao.createExercise({ ...exerciseInfo });
  }

  async updateDeleteStatus(_id) {
    const result = await exerciseDao.updateDeleteStatus(_id);
    if (_.isNil(result)) throw new Error("不允许删除不存在的题目");
    return result;
  }

  async updateExercise({ _id, exercise_type, exercise_desc, exercise_level }) {
    return await exerciseDao.updateExercise({
      _id,
      exercise_type,
      exercise_desc,
      exercise_level,
    });
  }

  async findExerciseById(_id) {
    return await exerciseDao.findExerciseById(_id);
  }

  async findExerciseByType({ exercise_type }) {
    return await exerciseDao.findExerciseByType({ exercise_type });
  }

  async generateExercises({ exercise_types }) {
    if (exercise_types.length !== 3) throw new Error("题目类型必须为3种");
    // map函数遍历操作和调用回调函数是同步，会阻塞整个线程直到遍历完成。
    // 如果回调函数中有异步操作，不会等异步操作完成而是往下遍历
    // TODO——提高响应 async.map等待时间2.x秒
    var result = await async.map(exercise_types ,async ({ exercise_type }) => {
      const temp = await exerciseDao.findExerciseByType({ exercise_type });
      return temp
    });
    // console.log(result);
    return result;
  }
}

const exerciseService = new ExerciseService();

module.exports = exerciseService;
