const mocks = require('../mocks/privacyType.json');
const PrivacyType = require('../models/PrivacyType');

const PrivacyTypeSeeder = {};
PrivacyTypeSeeder.dropDatabase = async () => {
    console.log('Removing Privacy Type collection ...');
    try {
        await PrivacyType.deleteMany();
        console.log('Privacy Type collection removed');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

PrivacyTypeSeeder.fillDatabase = async () => {
    console.log('Seeding privacy types...');
    try {
        await PrivacyType.insertMany(mocks);
        console.log('Privacy Type collection filled');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

PrivacyTypeSeeder.seed = async () => {
    await PrivacyTypeSeeder.dropDatabase();
    await PrivacyTypeSeeder.fillDatabase();
};

module.exports = PrivacyTypeSeeder;
