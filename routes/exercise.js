const express = require("express")
const wrapper = require("../utils/wrapper/index")
const exerciseController = require("../controller/exercise")

const router = express.Router()

router.get("/exercise/getbyid", wrapper(exerciseController.getExerciseById))
router.get("/exercise/getbytype", wrapper(exerciseController.getExerciseByType))

module.exports = router