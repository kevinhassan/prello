const mongoose = require('mongoose');
const chalk = require('chalk');
const bluebird = require('bluebird');

module.exports = (config) => {
    mongoose.Promise = bluebird;
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
    const mongoUrl = config.DATABASE_URI;
    mongoose.connect(mongoUrl)
        .then(() => {
            console.log('Succesfully Connected to the Mongodb Database..');
        })
        .catch((err) => {
            console.error(err);
            console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
            process.exit();
        });
};
