// consul 客户端以及本服务的相关配置
const CONSUL = {
  HOST: "127.0.0.1",
  HOST_PORT: 8500,
  SERVICE_NAME: "interview_manage",
  SERVICE_PORT: 3002,
};

const Exercise_Type = {
  exercise_type: [
    "自我认知类问题",
    "人际关系类问题",
    "组织管理类问题",
    "情景模拟类问题",
    "解决问题类问题",
    "应急应变类问题",
    "社会现象类问题",
  ],
};

const Exercise_Level = {
  exercise_level: ["easy", "middle", "hard"],
};

function getExerciseType() {
  return Exercise_Type.exercise_type;
}

function getExerciseLevel() {
  return Exercise_Level.exercise_level;
}

module.exports = { getExerciseType, getExerciseLevel, CONSUL };
