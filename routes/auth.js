const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// @route    POST /api/auth/signup
// @desc     sign up new user
// @access   public
router.post('/signup', [
    check('name', 'Name is required').notEmpty(),
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], async (req, res) => {
    // check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, username, password} = req.body;

    // check if username does not contain special character except '_'
    const regex = /[^a-zA-Z0-9_]/;
    const invalid = regex.test(username);

    if(invalid) {
        return res.status(400).json({errors: [{msg: "Username can only contain letters, numbers, and '_'"}]});
    }

    // check if username exceeds 15 characters
    if(username.length > 15) {
        return res.status(400).json({errors: [{msg: 'Username must not exceed 15 characters'}]});
    }

    try {
        // search for username
        let user = await User.findOne({username});

        // check if username already exists
        if(user) {
            return res.status(400).json({errors: [{msg: 'Username is already taken'}]});
        }

        // create user object
        user = {name, username, password};

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user in database
        user = await User.create(user);

        // create payload object
        const payload = {
            user: {
                id: user.id
            }
        };

        // create token
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.status(200).json({
            user: {
                _id: user.id,
                name,
                username
            },
            token
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    POST /api/auth/login
// @desc     login user
// @access   public
router.post('/login', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], async (req, res) => {
    // check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;

    try {
        // search for user
        let user = await User.findOne({username});

        // check if user does not exists
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Incorrect username or password'}]});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        // check if password does not match
        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Incorrect username or password'}]});
        }

        // creat payload object
        const payload = {
            user: {
                id: user.id
            }
        };

        // create token
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.status(200).json({
            user: {
                _id: user.id,
                name: user.name,
                username: user.username
            },
            token
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

module.exports = router;