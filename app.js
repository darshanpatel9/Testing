var express  = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
const config = require('./config/database');
var date = require('date-and-time');
var firebase = require("firebase");

// Connect to Database
mongoose.connect(config.database);

//var db = mongoose.connection;
// On Connection
mongoose.connection.on('connected', function(){
  console.log('Connected to database ' +config.database);
});

// On Error
mongoose.connection.on('error', function(err){
  console.log("...............ERROR..............");
  console.log('Database error: ' +err);
});

var routes = require('./routes/index');
var users = require('./routes/users');
var expenses = require('./routes/expenses');                                  //new

// Init App
var app = express();

// CORS Middleware
app.use(cors());

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.expense = req.expense || null;                     // new
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/expenses', expenses);                             // new

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});
