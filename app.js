var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var trajetRouter = require('./routes/trajet');
var localisationRouter = require('./routes/localisation');
var coursesRouter = require('./routes/coursesrouter');
var reservationRouter = require('./routes/reservation');
var vehiculeRouter = require('./routes/vehicule');
var userRouter = require('./routes/users');
var forgetRouter = require('./routes/forget');
var uploadRouter = require('./routes/upload');
var registerRouter = require('./routes/register');
var preferenceRouter = require('./routes/preference');



// mongoose connection
const mongoose = require('mongoose');

const Users = require('./models/users');
const  authJwt  = require('./routes/authJwt'); 
// Moucharafou code 

const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};





// Moucharafou code

//const url ='mongodb://localhost:27017/conFusion';
//const url ='mongodb://root:LGf-75G-JYm-sMb@ds041357.mlab.com:41357/heroku_gvb91g71';
const url ='mongodb+srv://dbadmin:hpX-yHf-SW6-6Um@clustertest.skmft.mongodb.net/Clustertest?retryWrites=true&w=majority';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
    console.log("Les roles créé avec ===:: Connected correctly to server");
}, (err) => { console.log(err); });



var app = express();

// view engine setup
app.use(cors(corsOptions));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '150MB' }))
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/forget', forgetRouter);
//app.post('/login',[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], loginRouter);
app.use('/localisation',  localisationRouter);
app.use('/trajet', [authJwt.verifyToken], trajetRouter);
app.use('/courses', [authJwt.verifyToken],  coursesRouter);
app.use('/reservation', [authJwt.verifyToken], reservationRouter);
app.use('/vehicule', [authJwt.verifyToken], vehiculeRouter);
app.use('/imageprofile', uploadRouter);
app.use('/preference', preferenceRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
