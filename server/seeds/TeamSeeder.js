const mocks = require('../mocks/teams.json');
const Team = require('../models/Team');

const TeamSeeder = {};
TeamSeeder.dropDatabase = async () => {
    console.log('Removing Team collection ...');
    try {
        await Team.deleteMany();
        console.log('Team collection removed');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

TeamSeeder.fillDatabase = async () => {
    console.log('Seeding Teams...');
    try {
        await Team.insertMany(mocks);
        console.log('Team collection filled');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};


TeamSeeder.seed = async () => {
    await TeamSeeder.dropDatabase();
    await TeamSeeder.fillDatabase();
};

module.exports = TeamSeeder;
