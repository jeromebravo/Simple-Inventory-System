const express = require('express');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// @route    GET /api/user
// @desc     get current user
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get user
        const user = await User.findById(req.user.id, '-password -date');

        res.status(200).json(user);
    } catch(err) {
        console.error(err);

        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;