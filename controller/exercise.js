const exerciseService = require("../service/exercise");

class ExerciseController {
  async createExercise(req) {
    const {
      exercise_type,
      exercise_desc,
      exercise_level = "simple",
    } = req.body;
    return await exerciseService.createExercise({
      exercise_type,
      exercise_desc,
      exercise_level,
    });
  }

  async deleteExercise(req) {
    const _id = req.query;
    return await exerciseService.updateDeleteStatus(_id);
  }

  async updateExercise(req) {
    const { _id, exercise_type, exercise_desc, exercise_level } = req.body;
    return await exerciseService.updateExercise({
      _id,
      exercise_type,
      exercise_desc,
      exercise_level,
    });
  }

  getExerciseType() {
    return exerciseService.getExerciseType();
  }

  getExerciseLevel() {
    return exerciseService.getExerciseLevel();
  }

  async getExerciseById(req) {
    const _id = req.query;
    return await exerciseService.findExerciseById(_id);
  }

  async getExerciseByType(req) {
    const { exercise_type } = req.body;
    return await exerciseService.findExerciseByType({ exercise_type });
  }

  // _id为面试记录的id
  async generateExercises(req) {
    const { _id, exercise_types } = req.body;
    return await exerciseService.generateExercises({ _id, exercise_types });
  }

  async getList(req) {
    const { exercise_type, exercise_level } = req.body;
    return await exerciseService.getList({ exercise_type, exercise_level });
  }
}

const exerciseController = new ExerciseController();

module.exports = exerciseController;
