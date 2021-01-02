const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Expense', ExpenseSchema);