const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
    userID: {type: String, require: [true, "Missing: UserID is required"]},
    amount: {type: String, require: [false]}
})
module.exports = mongoose.model("Currency", currencySchema);
