require('../config/database');

// ====== Get Seeders
const seeders = [];
seeders.push(require('./BoardSeeder'));
seeders.push(require('./CardSeeder'));
seeders.push(require('./ListSeeder'));
seeders.push(require('./PrivacyTypeSeeder'));

// ====== Seed all collections
async function seedAll() {
    seeders.map(async (x) => {
        await x.seed();
    });
}
seedAll();
