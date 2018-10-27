const mocks = require('../mocks/card.json');
const Card = require('../models/Card');

const CardSeeder = {};
CardSeeder.dropDatabase = async () => {
    console.log('Removing Card collection ...');
    try {
        await Card.deleteMany();
        console.log('Card collection removed');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};

CardSeeder.fillDatabase = async () => {
    console.log('Seeding Cards...');
    try {
        await Card.insertMany(mocks);
        console.log('Card collection filled');
    } catch (error) {
        console.log(`Error:${error}`);
        process.exit(1);
    }
};


CardSeeder.seed = async () => {
    await CardSeeder.dropDatabase();
    await CardSeeder.fillDatabase();
};

module.exports = CardSeeder;
