const express = require('express');
const auth = require('../middleware/auth');
const currentDate = require('../utils/currentDate');
const {check, validationResult} = require('express-validator');
const Expense = require('../models/Expense');
const router = express.Router();

// @route    GET /api/expense
// @desc     get all expenses
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get expenses
        const expenses = await Expense.find({user: req.user.id}, '-user').sort('-date');

        res.status(200).json(expenses);
    } catch(err) {
        console.error(err);

        res.status(500).json({msg: 'Server error'});
    }
});

// @route    POST /api/expense
// @desc     create new expense
// @access   private
router.post('/', [auth,
    check('description', 'Description is required').notEmpty(),
    check('price', 'Price must be a number').isNumeric()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // check if price is less than 0
    if(req.body.price < 0) {
        return res.status(400).json({errors: [{msg: 'Price must be at least 0'}]});
    }

    // get current date
    const date = currentDate();

    try {
        // create expense
        const expense = await Expense.create({user: req.user.id, date, ...req.body});

        res.status(200).json({
            description: expense.description,
            price: expense.price,
            date: expense.date,
            _id: expense._id
        });
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    POST /api/expense/search
// @desc     search expense by description
// @access   private
router.post('/search', [auth,
    check('description', 'Description is required').notEmpty()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // create regex pattern
    const pattern = new RegExp(req.body.description);

    try {
        // get expenses
        const expenses = await Expense.find({user: req.user.id, description: {$regex: pattern, $options: '-i'}}, '-user')
                                        .sort('-date');

        res.status(200).json(expenses);
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    POST /api/expense/date
// @desc     search expense by date
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
        // get expenses
        const expenses = await Expense.find({user: req.user.id, date: {$gte: from, $lte: to}}, '-user')
                                        .sort('-date');

        res.status(200).json(expenses);
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    GET /api/expense/:expenseId
// @desc     get one expense
// @access   private
router.get('/:expenseId', auth, async (req, res) => {
    try {
        // get expense
        const expense = await Expense.findOne({user: req.user.id, _id: req.params.expenseId}, '-user');

        // check if expense does not exists
        if(!expense) {
            return res.status(404).json({msg: 'Expense not found'});
        }

        res.status(200).json(expense);
    } catch(err) {
        console.error(err);

        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ObjectId'});
        }

        res.status(500).json({msg: 'Server error'});
    }
});

// @route    PUT /api/expense/:expenseId/edit
// @desc     edit expense
// @access   private
router.put('/:expenseId/edit', [auth,
    check('description', 'Description is required').notEmpty(),
    check('price', 'Price must be a number').isNumeric()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {description, price} = req.body;

    try {
        // get expense
        const expense = await Expense.findOne({user: req.user.id, _id: req.params.expenseId}, '-user');

        // check if expense does not exists
        if(!expense) {
            return res.status(404).json({errors: [{msg: 'Expense not found'}]});
        }

        // update expense
        expense.description = description;
        expense.price = price;

        // save expense
        await expense.save();

        res.status(200).json(expense);
    } catch(err) {
        console.error(err);

        if(err.kind === 'ObjectId') {
            return res.status(400).json({errors: [{msg: 'Invalid ObjectId'}]});
        }

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    DELETE /api/expense/:expenseId/delete
// @desc     delete expense
// @access   private
router.delete('/:expenseId/delete', auth, async (req, res) => {
    try {
        // get expense
        const expense = await Expense.findOne({user: req.user.id, _id: req.params.expenseId});

        // check if expense does not exists
        if(!expense) {
            return res.status(404).json({msg: 'Expense not found'});
        }

        // delete expense
        await expense.delete();

        res.status(200).json({msg: 'Deleted'});
    } catch(err) {
        console.error(err);

        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ObjectId'});
        }

        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;