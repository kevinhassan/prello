const config = require('../config');
require('../database')(config);
// ====== Get Seeders
const seeders = [];
seeders.push(require('./BoardSeeder'));
seeders.push(require('./CardSeeder'));
seeders.push(require('./ListSeeder'));
seeders.push(require('./PrivacyTypeSeeder'));

// ====== Seed all collections
async function seedAll() {
    try {
        await Promise.all(seeders.map(async seeder => seeder.seed()));
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
}
seedAll();
