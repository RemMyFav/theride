const asyncHandler = require('express-async-handler');
const Currency = require('../structure/currencyStructure');

// @route POST /api/currency/
const setCurrency = asyncHandler(async(req, res) => {
    console.log(req.body);
    
    //since this is called internally userID exist
    if(!req.body.userID){
        res.status(400);
        throw new Error("userID is required");
    }
    let x = 0
    if(req.body.amount){
        x = req.body.amount
    }
    //creating new calender 
    const currency = await Currency.create({
        userID: req.body.userID,
        amount: x,
    });
    res.json(currency);
});

// @route GET /api/currency/:userID
const getCurrency = asyncHandler(async(req, res) => {
    const currency = await Currency.find({userID: req.params.userID}).select([
        "amount",
    ]);
    if (!currency){
        res.status(404);
        throw new Error("User not found")
    }

    res.status(200).json(currency);
});

// @ruote PATCH /api/currency/add/:userID
const addCurrency = asyncHandler(async(req, res) => {
    const currency = await Currency.find({userID: req.params.userID}).select(
        "amount",
    );
    
    
    if (!currency){
        res.status(404);
        throw new Error("User not found")
    }
    let curr_add = 0;
    let new_amount = 0;
    if(req.body.amount){
        curr_add = req.body.amount;
    }
    else{
        res.status(404);
        throw new Error("need amount")
    }
    //original_amount = currency.amount;
    new_amount = curr_add + parseInt(currency[0].amount);
    const id = currency[0]._id;
    console.log(new_amount);
    const user = await Currency.updateOne(
        { _id: id},
        {$set: {amount: new_amount}}
    );
    
    const updated_amount = await Currency.find({userID: req.params.userID}).select(
        "amount",
    );
    
    res.status(200).json(updated_amount);
})

// @ruote PATCH /api/currency/subtract/:userID
const subtractCurrency = asyncHandler(async(req, res) => {
    const currency = await Currency.find({userID: req.params.userID}).select(
        "amount",
    );

    if (!currency){
        res.status(404);
        throw new Error("User not found")
    }
    let curr_sub = 0;
    let new_amount = 0;
    if(req.body.amount){
        curr_sub = req.body.amount;
    }
    else{
        res.status(404);
        throw new Error("need amount")
    }

    new_amount = parseInt(currency[0].amount) - curr_sub;

    if (new_amount < 0){
        res.status(400);
        throw new Error("Not enough money");
    }
    const id = currency[0]._id;
    const user = await Currency.updateOne(
        { _id: id},
        {$set: {amount: new_amount}}
    );
    const updated_amount = await Currency.find({userID: req.params.userID}).select(
        "amount",
    );
    
    res.status(200).json(updated_amount);
})
module.exports = {
    setCurrency,
    getCurrency,
    addCurrency,
    subtractCurrency
}