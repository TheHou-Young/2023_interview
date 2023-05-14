const exerciseModel = require("../models/exercise");

class ExerciseDao {
  async createExercise(exerciseInfo) {
    return await exerciseModel.create({ ...exerciseInfo });
  }

  async updateDeleteStatus(_id) {
    return await exerciseModel.findByIdAndUpdate(
      _id ,
      { delete_status: 1 },
      {new : true}
    );
  }

  async updateExercise({ _id, exercise_type, exercise_desc, exercise_level }) {
    return await exerciseModel.findByIdAndUpdate(
      { _id },
      { exercise_type, exercise_desc, exercise_level },
      {new : true}
    );
  }

  async findExerciseById(_id) {
    return await exerciseModel.findById(_id);
  }

  async findExerciseByType({ exercise_type }) {
    const aggregateQuery = [
      {
        $match: {
          exercise_type: { $eq: exercise_type },
        },
      },
      { $sample: { size: 1 } },
    ];
    return await exerciseModel.aggregate(aggregateQuery);
  }
}

const exerciseDao = new ExerciseDao();

module.exports = exerciseDao;
