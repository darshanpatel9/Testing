var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Expense = require('../models/expense');
let date = require('date-and-time');

// Add Expense
router.post('/addexpense', function(req, res){
  let newExpense = new Expense({
    category: req.body.category,
    amount: req.body.amount,
    details: req.body.details,
    username: req.body.username,
    date: req.body.date
  });
  // console.log(newExpense.username);
  Expense.addExpense(newExpense, function(err, expense){
    if(err){
      res.json({success: false, msg: 'Failed to add data'});
      console.log(err);
    } else {
      res.json({success: true, msg: 'Details added'});
    }
  })
});

// Show Expenses
router.get('/showexpenses', function(req, res){
  var username=req.query.username;
  Expense.find({username:username},function(err, expenses){
    if (err) return next(err);
    res.json({expenses: expenses});
  });
});

module.exports = router;
