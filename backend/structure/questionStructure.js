const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    title: { type: String, required: [true, "Missing: title is required"] },
    body: {type: String, required: [true, "Missing Question is required"]},
    userID: {type: String, required: [true, "Missing: User is required"]},
    taID: {type: [], required: [false]},
    bounty: {type: Number, required: [true, "Missing bounty is required"]},
    status: {
        type: String,
        enum: ['waiting', 'in progress', 'completed'],
        default: 'waiting',
        required: [true, "Missing status is required"]
    },
    category: {
        type: String,
        enum: ['computer_science', 'math', 'physics', 'chemistry', 'biology', 'extracurricular', 'other'], 
        required: [true, "Missing category is required"]
    }
},
{
    timestamps: true,
});
module.exports = mongoose.model("Question", questionSchema);
