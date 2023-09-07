const mongoose = require('mongoose');
// Structure of userProfile stored in mongoDB
// will make future edtis in terms of storing picture and history ratings
const profileSchema = mongoose.Schema({
    name: { type: String, required: [true, "Missing: title is required"] },
    user_id: { type: String, required: [true, "Missing: user_id is required"], unique: true },
    rating: { type: Number, default: 0 },
    num_of_rates: { type: Number, default: 0 },
    image: {data: String},
    //posted questions
    posted_questions: [{ type: String }],
    //answered questions
    answered_questions: [{ type: String }],
    //previous students
    previous_students: [{ type: String }],
    //previous teachers
    previous_teachers: [{ type: String }],
});
module.exports = mongoose.model("Profile", profileSchema);
