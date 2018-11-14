const winston = require('winston');

let logger = {};
if (process.env.NODE_ENV !== 'production') {
    logger = winston.createLogger({
        transports: [
            new (winston.transports.Console)({ level: 'debug' })
        ]
    });
}

module.exports = logger;
