let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('./database/connect.js')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let postRouter = require('./routes/post.js')
let adminRouter = require('./routes/admin.js')




let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Servir aquivos estaticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Servir arquivos estáticos da pasta 'components'
app.use('/components', express.static(path.join(__dirname, 'components')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/admin', adminRouter);

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
  res.render('error');
});

module.exports = app;
