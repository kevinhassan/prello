/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');
const swaggerSpec = require('./config/swagger');
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
 * Swagger API documentation
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * API examples routes.
 */
app.use('/', require('./routes/'));

app.use((req, res, next) => {
    res.status(404).send({ error: 'Not Found' });
});

module.exports = app;
