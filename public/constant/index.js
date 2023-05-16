const Exercise_Type = {
  exercise_type: [
    "背景性问题",
    "知识性问题",
    "思维性问题",
    "经验性问题",
    "情境性问题",
    "压力性问题",
    "行为性问题",
  ],
};

function getExerciseType() {
  return Exercise_Type.exercise_type;
}

module.exports = { getExerciseType };
