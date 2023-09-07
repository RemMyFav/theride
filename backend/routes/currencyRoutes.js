const express = require('express');
const router = express.Router();
const { setCurrency, getCurrency, addCurrency, subtractCurrency} = require('../controllers/currencyControllers');

router.post('/', setCurrency);
router.get('/:userID', getCurrency);
router.patch('/add/:userID', addCurrency);
router.patch('/subtract/:userID', subtractCurrency);
module.exports = router