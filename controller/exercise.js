const exerciseService = require("../service/exercise");

class ExerciseController {
  async getExerciseById(req) {
    const _id = req.query;
    return await exerciseService.findExerciseById(_id);
  }

  async getExerciseByType(req) {
    const { exercise_type } = req.body;
    return await exerciseService.findExerciseByType({ exercise_type });
  }
}

const exerciseController = new ExerciseController();

module.exports = exerciseController;
