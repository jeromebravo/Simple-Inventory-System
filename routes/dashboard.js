const express = require('express');
const auth = require('../middleware/auth');
const sum = require('../utils/sum');
const {check, validationResult} = require('express-validator');
const Product = require('../models/Product');
const Expense = require('../models/Expense');
const router = express.Router();

// @route    GET /api/dashboard
// @desc     get lifetime capital, expense, gross income, and net income
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get products
        const products = await Product.find({user: req.user.id}, '-user');

        // get expenses
        const expenses = await Expense.find({user: req.user.id}, '-user');

        // get total capital
        const capital = sum(products, 'capital');

        // get total expense
        const expense = sum(expenses, 'price');

        // get gross income
        const grossIncome = sum(products, 'price');

        // get net income
        const netIncome = (grossIncome - capital) - expense;

        res.status(200).json({
            capital,
            expense,
            grossIncome,
            netIncome
        });
    } catch(err) {
        console.error(err);

        res.status(500).json({msg: 'Server error'});
    }
});

// @route    POST /api/dashboard/date
// @desc     get capital, expense, gross income, and net income according to the date
// @access   private
router.post('/date', [auth,
    check('from', 'From must be a valid date').isDate(),
    check('to', 'To must be a valid date').isDate()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {from, to} = req.body;

    // check if from is greater than to
    if(from > to) {
        return res.status(400).json({errors: [{msg: 'To must be greater than From'}]});
    }

    try {
        // get products
        const products = await Product.find({user: req.user.id, date: {$gte: from, $lte: to}}, '-user');

        // get expenses
        const expenses = await Expense.find({user: req.user.id, date: {$gte: from, $lte: to}}, '-user');

        // get total capital
        const capital = sum(products, 'capital');

        // get total expense
        const expense = sum(expenses, 'price');

        // get gross income
        const grossIncome = sum(products, 'price');

        // get net income
        const netIncome = (grossIncome - capital) - expense;

        res.status(200).json({
            capital,
            expense,
            grossIncome,
            netIncome
        });
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

module.exports = router;