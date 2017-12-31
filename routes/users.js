/**
 * Created by DARSHAN on 22-06-2017.
 */

var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
//let generator = require('generate-password');
const bcrypt = require('bcryptjs');
//let nodemailer = require("nodemailer");

// MailGun For Send Mail
//let api_key = 'key-142878bd511340d948b415b6a70354fb';
//let domain = 'sandboxe2d2445044f741afaf8db405b11e54f4.mailgun.org';
//const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

// Register
router.post('/register', function(req, res){
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, function(err, user){
    if(err){
      res.json({success: false, msg: 'Failed to register user'});
      console.log(err);
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  })
});

// Login
router.post('/login', function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800   // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),  function(req, res, next){
  res.json({user: req.user});
});

/*router.post('/forget',function(req,res,next)  {

  const email = req.body.email;
  User.getUserByEmail(email,function(err,user) {
    if(err) {
      return res.json({success: false,msg:'Something Wrong Happen'});
    }

    if(!user) {
      return res.json({success: false,msg:'User Not Found'});
    }

    var Password = generator.generate({ length: 10, numbers: true});
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'expense.tracker123@gmail.com',
        pass: 'expense@tracker@123'
      },
      tls: {rejectUnauthorized: false},
      debug:true
    });

    var data = {
      from: 'expense.tracker123@gmail.com',
      to: user.email,
      subject: 'Password Changed', text: 'Hii! '+user.name+'\n\n\nEmail Id :'+user.email+'\nPassword='+Password+'\n\nPlease Be Secure..\n\nThank You!'
    };

    smtpTransport.sendMail(data, function(error, response){
      if(error){
        console.log("mail not sent--Password Remains As it As");
        console.log(error);
        return res.json({success:false,msg:"Mail has been not sent to your email"+user.email});
      }
      else{
        console.log("Mail Has Been Sent to : "+user.email);
        bcrypt.genSalt(10,function(err,salt) {
          bcrypt.hash(Password,salt,function(err,hash) {
            if(err){
              return res.json({success: false,msg:'Error While setting Password'});
            }
            user.password = hash;
            user.save();
            return res.json({success: true,msg:'Mail Has Been sent to your Email'+user.email});
          });
        });
      }
    });

  });
});*/



router.post('/change',function (req,res) {
  const user1 = new User ({
    username : req.body.username,
    password : req.body.password
  });
  User.getUserByUsername(user1.username,function (err,user) {
    if(err) throw err;
    user.password = user1.password;
    User.setPassword(user, function (err,user) {
      if(err) throw err;
      else {
        res.json({success:true,msg:'Password Changed'})
      }
    });
  });
});


// Validation of Current Password while changing password
router.post('/validatecurrentpassword', function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.json({
          success: true,
          user: {
            username: user.username,
          }
        });
      } else {
        return res.json({success: false, msg: 'Current password is not correct'});
      }
    });
  });
});

module.exports = router;
