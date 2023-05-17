var createError = require('http-errors');
var express = require('express');
var path = require('path');
const dbConfig = require("./lib/db.js");
const emailService = require("./services/email");
const passport = require("passport");
const session = require("express-session");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./models");
require("./lib/passport.js");

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

const app = express();
const MongoDBStore = require("connect-mongodb-session")(session);

app.disable("x-powered-by");

//Connect to Database
app.dbConfig = dbConfig;
dbConfig.connect().then((connection) => {
  app.mongooseConnection = connection;
});

// Connect to Email client
emailService.connect();


// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.sessionStore = new MongoDBStore({uri: process.env.DB_URL || "mongodb://localhost:27017"});
let sessionConfig = {
  secret: process.env.SESSION_SECRET || "hardPassword",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 14 * 24 * 60 * 60 * 1000 },
  store: app.sessionStore
};

app.set("trust proxy", 1);
app.use(express.json({"limit": "50mb"}));
app.use(express.urlencoded({ extended: false, "limit": "50mb" }));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Server error");
});

module.exports = app;
