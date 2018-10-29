/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const cors = require('cors');
const config = require('./config');

/**
 * Create Express server.
 */
const app = express();
require('./database')(config);

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
app.use(cors());

app.disable('x-powered-by');

/**
 * Middlewares
 */
app.use('/', require('./middlewares/auth').authRequest);
/**
 * Load all the models
 */
require('./models');

/**
 * Set up socket
 */
require('./socket');

/**
 * API examples routes.
 */
app.use('/', require('./routes/'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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
