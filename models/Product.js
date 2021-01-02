const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    capital: {type: Number, required: true},
    status: {type: String, required: true, default: 'Available'},
    price: {type: Number, required: true, default: 0},
    date: {type: Date, required: true},
    soldDate: {type: Date, default: null}
});

module.exports = mongoose.model('Product', ProductSchema);