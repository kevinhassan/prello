const mocks = require('../mocks/labels.json');
const Label = require('../models/Label');

const LabelSeeder = {};
LabelSeeder.dropDatabase = async () => {
    console.log('Removing Label collection ...');
    try {
        await Label.deleteMany();
        console.log('Label collection removed');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

LabelSeeder.fillDatabase = async () => {
    console.log('Seeding Labels...');
    try {
        await Label.insertMany(mocks);
        console.log('Label collection filled');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};


LabelSeeder.seed = async () => {
    await LabelSeeder.dropDatabase();
    await LabelSeeder.fillDatabase();
};

module.exports = LabelSeeder;
