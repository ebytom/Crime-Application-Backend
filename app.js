// packages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// middleware handlers
const { error } = require('./utils/error');
const isAuthenticated = require('./middleware/isAuthenticated');
const isAdmin = require('./middleware/isAdmin');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const crimeRouter = require('./routes/crime');
const criminalRouter = require('./routes/criminal');
const fileRouter = require('./routes/file');
const dashboardRouter = require('./routes/dashboard');

// express app
const app = express();

// middlewares
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/v1/app/file', fileRouter);
app.use('/api/v1/app/auth', authRouter);
app.use('/api/v1/app/users', isAuthenticated, usersRouter);
app.use('/api/v1/app/admin', isAdmin, adminRouter);

app.use('/api/v1/app/crime', crimeRouter);
app.use('/api/v1/app/criminal', criminalRouter);
app.use('/api/v1/app/dashboard', dashboardRouter);

app.use('/', indexRouter);

// error handler
app.use(error)

module.exports = app;