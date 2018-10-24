/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const secret = require('./util/secret');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: './env' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Deprecation warnings
 * https://mongoosejs.com/docs/deprecations.html
 */

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

/**
 * Connect to MongoDB.
 */
const mongoUrl = secret.MONGODB_URI;
mongoose.connect(mongoUrl);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 9090);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.disable('x-powered-by');

/**
 * API examples routes.
 */
app.use('/', require('./routes/'));

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    message: 'Not found !'
  });
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

module.exports = app;
