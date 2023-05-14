const exerciseDao = require("../dao/exercise");

class ExerciseService {
  async findExerciseById(_id) {
    return await exerciseDao.findExerciseById(_id);
  }

  async findExerciseByType({ exercise_type }) {
    return await exerciseDao.findExerciseByType({ exercise_type });
  }
}

const exerciseService = new ExerciseService();

module.exports = exerciseService;
