const mocks = require('../mocks/lists.json');
const List = require('../models/List');

const ListSeeder = {};
ListSeeder.dropDatabase = async () => {
    console.log('Removing List collection ...');
    try {
        await List.deleteMany();
        console.log('List collection removed');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

ListSeeder.fillDatabase = async () => {
    console.log('Seeding Lists...');
    try {
        await List.insertMany(mocks);
        console.log('List collection filled');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};


ListSeeder.seed = async () => {
    await ListSeeder.dropDatabase();
    await ListSeeder.fillDatabase();
};

module.exports = ListSeeder;
