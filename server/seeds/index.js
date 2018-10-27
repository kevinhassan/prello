require('../config/database');

const seeders = [];
seeders.push(require('./Card'));
seeders.push(require('./PrivacyType'));

async function seedAll() {
    seeders.map(async (x) => {
        await x.seed();
    });
}
seedAll();
