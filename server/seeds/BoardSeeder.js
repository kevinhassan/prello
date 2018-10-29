const mocks = require('../mocks/boards.json');
const Board = require('../models/Board');

const BoardSeeder = {};
BoardSeeder.dropDatabase = async () => {
    console.log('Removing Board collection ...');
    try {
        await Board.deleteMany();
        console.log('Board collection removed');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

BoardSeeder.fillDatabase = async () => {
    console.log('Seeding Boards...');
    try {
        await Board.insertMany(mocks);
        console.log('Board collection filled');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};


BoardSeeder.seed = async () => {
    await BoardSeeder.dropDatabase();
    await BoardSeeder.fillDatabase();
};

module.exports = BoardSeeder;
