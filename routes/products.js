const express = require('express');
const auth = require('../middleware/auth');
const currentDate = require('../utils/currentDate');
const {check, validationResult} = require('express-validator');
const Product = require('../models/Product');
const router = express.Router();

// @route    POST /api/product
// @desc     create new product
// @access   private
router.post('/', [auth,
    check('name', 'Name is required').notEmpty(),
    check('capital', 'Capital must be a number').isNumeric()
], async (req, res) => {
    // check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // check if capital is less than 0
    if(req.body.capital < 0) {
        return res.status(400).json({errors: [{msg: 'Capital must be at least 0'}]});
    }

    try {
        // get current date
        const date = currentDate();

        // create product
        const product = await Product.create({user: req.user.id, date, ...req.body});

        res.status(200).json({
            status: product.status,
            price: product.price,
            soldDate: product.soldDate,
            _id: product.id,
            name: product.name,
            capital: product.capital,
            date: product.date
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    POST /api/product/search
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
        const products = await Product.find({user: req.user.id, name: {$regex: pattern, $options: 'i'}}, '-user')
                                        .sort('-date');

        res.status(200).json(products);
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    POST /api/product/status
// @desc     search products by its status
// @access   private
router.post('/status', [auth,
    check('status', 'Status is required').notEmpty()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        let products;

        // get products
        if(req.body.status === 'All') {
            products = await Product.find({user: req.user.id}, '-user')
                                            .sort('-date');

        } else {
            products = await Product.find({user: req.user.id, status: req.body.status}, '-user')
                                            .sort('-date');
        }

        res.status(200).json(products);
    } catch(err) {
        console.error(err);

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    GET /api/product/:productId
// @desc     get one product
// @access   private
router.get('/:productId', auth, async (req, res) => {
    try {
        // get product
        const product = await Product.findOne({user: req.user.id, _id: req.params.productId}, '-user');

        // check if product does not exists
        if(!product) {
            return res.status(404).json({msg: 'Product not found'});
        }

        res.status(200).json(product);
    } catch(err) {
        console.error(err);

        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ObjectId'});
        }

        res.status(500).json({msg: 'Server error'});
    }
});

// @route    PUT /api/product/:productId/edit
// @desc     edit product
// @access   private
router.put('/:productId/edit', [auth,
    check('name', 'Name is required').notEmpty(),
    check('capital', 'Capital must be a number').isNumeric()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // check if capital is less than 0
    if(req.body.capital < 0) {
        return res.status(400).json({errors: [{msg: 'Capital must be at least 0'}]});
    }

    try {
        // get product
        const product = await Product.findOne({user: req.user.id, _id: req.params.productId}, '-user');

        // check if product does not exists
        if(!product) {
            return res.status(404).json({errors: [{msg: 'Product not found'}]});
        }

        // update product
        product.name = req.body.name;
        product.capital = req.body.capital;
        
        // save product
        await product.save();

        res.status(200).json(product);
    } catch(err) {
        console.error(err);
        
        if(err.kind === 'ObjectId') {
            return res.status(400).json({errors: [{msg: 'Invalid ObjectId'}]});
        }

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    PUT /api/product/:productId/buy
// @desc     buy product
// @access   private
router.put('/:productId/buy', [auth,
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

    try {
        // get product
        const product = await Product.findOne({user: req.user.id, _id: req.params.productId}, '-user');                 

        // check if product does not exists
        if(!product) {
            return res.status(404).json({errors: [{msg: 'Product not found'}]});
        }

        // check if product is already sold
        if(product.status === 'Sold') {
            return res.status(400).json({errors: [{msg: 'Product is already sold'}]});
        }

        // get current date
        const date = currentDate();

        // update product
        product.price = req.body.price;
        product.status = 'Sold';
        product.soldDate = date;
        
        // save product
        await product.save();

        res.status(200).json(product);
    } catch(err) {
        console.error(err);
        
        if(err.kind === 'ObjectId') {
            return res.status(400).json({errors: [{msg: 'Invalid ObjectId'}]});
        }

        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    DELETE /api/product/:productId
// @desc     delete product
// @access   private
router.delete('/:productId', auth, async (req, res) => {
    try {
        // get product
        const product = await Product.findOne({user: req.user.id, _id: req.params.productId});

        // check if product does not exists
        if(!product) {
            return res.status(404).json({msg: 'Product not found'});
        }

        // delete product
        await product.delete();

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