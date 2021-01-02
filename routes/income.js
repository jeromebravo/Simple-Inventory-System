const express = require('express');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const Product = require('../models/Product');
const router = express.Router();

// @route    GET /api/income
// @desc     get all sold products
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get products
        const products = await Product.find({user: req.user.id, status: 'Sold'}, '-user')
                                        .sort('-soldDate');

        res.status(200).json(products);
    } catch(err) {
        console.error(err);

        res.status(500).json({msg: 'Server error'});
    }
});

// @route    PUT /api/income/:productId/cancel
// @desc     cancel/return sold products
// @access   private
router.put('/:productId/cancel', auth, async (req, res) => {
    try {
        // get product
        const product = await Product.findOne({user: req.user.id, _id: req.params.productId, status: 'Sold'});

        // check if product does not exists
        if(!product) {
            return res.status(404).json({msg: 'Product not found'});
        }

        // update product
        product.status = 'Available';
        product.price = 0;
        product.soldDate = null;

        // save product
        await product.save();

        res.status(200).json(product);
    } catch(err) {
        console.error(err);

        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ObjectId'});
        }

        res.status(500).json({msg: 'Server error'});
    }
});

// @route    POST /api/income/search
// @desc     search products by name
// @access   private
router.post('/search', [auth,
    check('name', 'Name is required').notEmpty()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // regex pattern
    const pattern = new RegExp(req.body.name);

    try {
        // get products
        const products = await Product.find({user: req.user.id, status: 'Sold', name: {$regex: pattern, $options: 'i'}}, '-user')
                                        .sort('-date');

        res.status(200).json(products);
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    POST /api/income/date
// @desc     search products by date
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
        const products = await Product.find({user: req.user.id, status: 'Sold', soldDate: {$gte: from, $lte: to}});

        res.status(200).json(products);
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

module.exports = router;