const asyncHandler = require('express-async-handler');
const Profile = require('../structure/profileStructure');
const fs = require('fs');
var multiparty = require('multiparty');


// Create user profile
const setProfile = asyncHandler(async(req, res) => {
    //Check required title
    if (!req.body.name) {
        res.status(400);
        throw new Error("Title is required");
    }

    //Create new profile
    const profile = await Profile.create({
        name: req.body.name,
        user_id: req.params.id,
        createDate: new Date(),
        image: null,
        posted_questions: [],
        answered_questions: [],
        previous_students: [],
        previous_teachers: [],
    });
    res.json(profile);
});

// Get user profile by id
const getProfile = asyncHandler(async(req, res) => {
    // Check required id
    if (!req.params.id) {
        res.status(400);
        throw new Error("Id is required");
    }
    
    // Find profile by id and return
    const profile = await Profile.findOne({ user_id: req.params.id });
    if (!profile) {
        res.status(404);
        throw new Error("Profile not found");
    }
      
    res.json(profile);
    
});

const getAllProfile = asyncHandler(async(req, res) => {
    const profile = await Profile.find();
    if (!profile) {
        res.status(404);
        throw new Error("Profile not found");
    }
      
    res.json(profile);
});

// Delete user profile by id
const deleteProfile = asyncHandler(async(req, res) => {
    // Check required id
    if (!req.params.id) {
        res.status(400);
        throw new Error("Id is required");
    }
    // Find profile by id and delete
    const profile = await Profile.findOne({ user_id: req.params.id });
    if (!profile) {
        res.status(404);
        throw new Error("Profile not found");
    }
    const deleted = await Profile.deleteOne({ user_id: req.params.id });
    res.json(deleted);

});

// Update user's name and profile picture by id
const updateProfile = asyncHandler(async(req, res) => {
    // Check required id
    if (!req.params.id) {
        res.status(400);
        throw new Error("Id is required");
    }

    // Find profile by id
    const filter = { user_id: req.params.id };
    var profile = await Profile.findOne(filter);
    if (!profile) {
        res.status(404);
        throw new Error("Profile not found");
    }

    var results = [];
    // update
    if (req.body.name) {
        var update = { $set: { name: req.body.name } };
        const result1 = await Profile.updateOne(filter, update);
        if (!result1) {
            res.status(404);
            throw new Error("Profile not found");
        }
        results.push(result1)
    }
    console.log(req.body)
    if (req.body.image) {
        var str = req.body.image;
        //Read it into a buffer
        const buffer = Buffer(str, 'base64');

        console.log(buffer)

        var update = { $set: { image: buffer } };
        const result2 = await Profile.updateOne(filter, update);
        if (!result2) {
            res.status(404);
            throw new Error("Profile not found");
        }
        results.push(result2)
    }
    
    // Find profile by id and return
    profile = await Profile.findOne(filter);
    res.status(200).json(profile);
});

function validate(obj, res, code, message) {
    if (!obj) {
        res.status(code);
        throw new Error(message);
    }
}

//Update rating when a user comment on a question and a rating is given
const updateRating = asyncHandler(async(req, res) => {
    // Check required id
    validate(req.params.id, res, 400, "Id is required");

    // Find profile by id
    const filter = { user_id: req.params.id };
    const profile = await Profile.findOne(filter);
    validate(profile, res, 404, "Profile not found");

    // update rating
    if (req.params.rating) {
        
        //Find the correct number to update rating with
        var rating = parseInt(req.params.rating);
        var rate = profile.rating;
        var num = profile.num_of_rates;
        var newRating = (rate * num + rating) / (num + 1);

        //Update num_of_rates
        var update = { $set: { num_of_rates: num + 1 } };
        const result_num = await Profile.updateOne(filter, update);
        validate(result_num, res, 404, "Profile not found");

        //Update rating
        update = { $set: { rating: newRating } };
        const result = await Profile.updateOne(filter, update);
        validate(result, res, 404, "Profile not found");
    }
    else {
        res.status(400);
        throw new Error("Rating is required");
    }
    
    // Find profile by id and return
    const profile1 = await Profile.findOne(filter);
    res.json({ message: "Rating updated", profile1 });
});

//Update answered questions when a user answer a question
const updateAnsweredQuestions = asyncHandler(async(req, res) => {
    // Check required id
    validate(req.params.id, res, 400, "Id is required");

    // Validate profile by id
    const filter = { user_id: req.params.id };
    const profile = await Profile.findOne(filter);
    validate(profile, res, 404, "Profile not found");

    // update answered questions
    if (req.params.question_id) {

        //Grab and update answered questions
        var answered_questions = profile.answered_questions;
        answered_questions.push(req.params.question_id);
        var update = { $set: { answered_questions: answered_questions } };
        const result = await Profile.updateOne(filter, update);
        validate(result, res, 404, "Profile not found");
    }
    else {
        res.status(400);
        throw new Error("Question id is required");
    }

    res.json({ message: "Answered questions updated", result });
});

module.exports = {
    getProfile,
    setProfile,
    getAllProfile,
    deleteProfile,
    updateProfile,
    updateRating,
    updateAnsweredQuestions
}