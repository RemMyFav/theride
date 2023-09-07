const asyncHandler = require("express-async-handler");
const Question = require("../structure/questionStructure");
const Profile = require("../structure/profileStructure");

function validate(obj, res, code, message) {
    if (!obj) {
        res.status(code);
        throw new Error(message);
    }
}

// @route POST /api/questions
const setQuestion = asyncHandler(async (req, res) => {
    //Check required title
    if (!req.body.title) {
        res.status(400);
        throw new Error("Title is required");
    }
    if (!req.body.body) {
        res.status(400);
        throw new Error("Body is required");
    }
    if (!req.body.category) {
        res.status(400);
        throw new Error("Category is required");
    }
    if (!req.body.bounty) {
        res.status(400);
        throw new Error("Bounty is required");
    }
    //Create new calendar
    const u_id = req.params.id;
    const question = await Question.create({
        title: req.body.title,
        status: "waiting",
        taID: [],
        userID: u_id,
        body: req.body.body,
        bounty: req.body.bounty,
        createDate: new Date(),
        category: req.body.category,
    });

    //Update the posted questions list of user profile

    // Validate profile by id
    const filter = { user_id: u_id };
    const profile = await Profile.findOne(filter);
    validate(profile, res, 404, "Profile not found");

    //Grab and update posted questions
    var posted_questions = profile.posted_questions;
    posted_questions.push(question._id);
    var update = { $set: { posted_questions: posted_questions } };
    const result = await Profile.updateOne(filter, update);
    validate(result, res, 404, "Profile not found");

    res.json(question);
});

// @route GET /api/questions/:id/:category?
const getQuestion = asyncHandler(async (req, res) => {
    var questions = [];
    var all_cat = [
        "computer_science",
        "math",
        "physics",
        "chemistry",
        "biology",
        "extracurricular",
        "other",
    ];
    if (req.params.category != null) {
        if (all_cat.includes(req.params.category.trim())) {
            questions = await Question.find({
                category: req.params.category.trim(),
            });
        }
        const all_questions = await Question.find();

        for (var i = 0; i < all_questions.length; i++) {
            if (
                all_questions[i].title.includes(req.params.category.trim()) &
                (contains(all_questions[i], questions) === false) &
                (all_questions[i].status === "waiting")
            ) {
                questions.push(all_questions[i]);
            }
        }
    } else if (req.params.category == null) {
        questions = await Question.find();
    }

    res.status(200).json(questions);
});

function contains(question, lst) {
    for (var i = 0; i < lst.length; i++) {
        if (question._id.value === lst[i]._id.value) {
            return true;
        }
    }
    return false;
}

// @route GET /api/questions/:id/:question_id
const getQuestionById = asyncHandler(async (req, res) => {
    var question = null;
    if (req.params.question_id != null) {
        question = await Question.find({ _id: req.params.question_id.trim() });
    }
    res.status(200).json(question);
});

// @route PUT /api/questions/:id/acceptQuestion/:question_id
const acceptQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.question_id);

    if (!question) {
        res.status(400);
        throw new Error("Question not found.");
    }

    for (let i = 0; i < question.taID.length; i++) {
        if (question.taID[i]._id === req.params.id) {
            res.status(400);
            throw new Error("Question has been accepted.");
        }
    }
    const acceptedQuestion = await Question.findByIdAndUpdate(
        req.params.question_id,
        {
            $push: { taID: { _id: req.params.id, comment: req.body.comment } },
        },
        {
            new: true,
        }
    );

    res.status(200).json(acceptedQuestion);
});

// @route GET /api/questions
const paginateQuestion = asyncHandler(async (req, res) => {
    const page_size = 10;
    const total_questions = await Question.count();
    const total_pages = Math.ceil(total_questions / page_size);

    const current_page = req.query.page || 1; // default to page 1
    const skip = (current_page - 1) * page_size;
    const questions = await Question.find().skip(skip).limit(page_size);

    res.status(200).json({
        questions,
        total_pages,
        current_page,
    });
});

// @route PUT /api/questions
const updateQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        res.status(400);
        throw new Error("Question not found");
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.question_id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedQuestion);
});

// @route GET /api/questions/:user_id/
const getQuestionsByUserId = asyncHandler(async (req, res) => {
    return list(Question.find((userID = req.params.user_id)));
});

const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.question_id);
    if (!question) {
        res.status(400);
        throw new Error("Question not found");
    }

    await question.remove();

    res.status(200).json({ id: req.params.question_id }); //need to return the whole data of the question
});

const acceptTa = asyncHandler(async (req, res) => {
    if (!req.body.questionID || !req.body.taID) {
        res.status(400);
        throw new Error("Question id or TA id not found");
    }
    const question = await Question.findById(req.body.questionID);
    if (!question) {
        res.status(400);
        throw new Error("Question not found");
    }
    if (question.status !== "waiting") {
        res.status(400);
        throw new Error("Question is not waiting");
    }
    question.taID = question.taID.filter((ta) => ta._id === req.body.taID);
    question.status = "in progress";
    await question.save();
    res.status(200).json(question);
});

const finishQuestion = asyncHandler(async (req, res) => {
    if (!req.body.questionID || !req.body.taID) {
        res.status(400);
        throw new Error("Question id not found");
    }
    const question = await Question.findById(req.body.questionID);
    if (!question) {
        res.status(400);
        throw new Error("Question not found");
    }
    question.status = "completed";
    question.taID = [];
    await question.save();
    res.status(200).json(question);
});

module.exports = {
    setQuestion,
    getQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getQuestionsByUserId,
    acceptQuestion,
    acceptTa,
    finishQuestion,
};
