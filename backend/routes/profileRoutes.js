const express = require('express');
const router = express.Router();
const { getProfile, setProfile, deleteProfile, updateProfile, updateRating, updateAnsweredQuestions, getAllProfile } = require('../controllers/profileControllers');

const authed = require("../middleware/authCheck.js");


//IMPORTANT: All ids below are user ids, not profile _ids
router.post('/set/:id', setProfile);
router.post('/update/:id', authed, updateProfile);
router.get('/:id', authed, getProfile);
router.get('', getAllProfile)
router.delete('/:id', authed, deleteProfile);
router.put('/:id/:rating', updateRating);
router.put('/:id/a_question/:question_id', authed, updateAnsweredQuestions);
module.exports = router