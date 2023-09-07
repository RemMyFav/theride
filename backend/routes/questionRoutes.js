const express = require("express");
const router = express.Router();

const authed = require("../middleware/authCheck.js");

const {
    getQuestion,
    getQuestionById,
    setQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsByUserId,
    acceptQuestion,
    acceptTa,
    finishQuestion,
} = require("../controllers/questionControllers");

router.post("/finishQuestion", finishQuestion);
router.post("/acceptTa", acceptTa);
router.get("/:id/:category?", getQuestion);
router.get("/:id/q_id/:question_id", getQuestionById);
router.post("/:id", authed, setQuestion);
router.put("/:id/:question_id", authed, updateQuestion);
router.delete("/:id/:question_id", authed, deleteQuestion);
router.put("/:id/acceptQuestion/:question_id", acceptQuestion);
// get question by user_id
// get question by ta_id
module.exports = router;
