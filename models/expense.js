const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const config = require('../config/database');
let date = require('date-and-time');

// Expense Schema
const ExpenseSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

var Expense = module.exports = mongoose.model('Expense', ExpenseSchema);

/*module.exports.getExpenseById = function(id, callback){
  Expense.findById(id, callback);
}*/

module.exports.addExpense = function(newExpense, callback){
  newExpense.save(callback);
}

/*module.exports.showExpense = function(callback){
  Expense.find(function (err, expenses) {
    if (err) return console.error(err);
    console.log(expenses);
  });
}*/
