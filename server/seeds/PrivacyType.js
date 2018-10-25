const mocks = require('../mocks/privacyType.json');
const PrivacyType = require('../models/PrivacyType');


async function dropDatabase() {
  console.log('Removing Privacy Type collection ...');
  try {
    await PrivacyType.deleteMany();
    console.log('Privacy Type collection removed');
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
}

async function fillDatabase() {
  console.log('Seeding privacy types...');
  try {
    await PrivacyType.insertMany(mocks);
    console.log('Privacy Type collection filled');
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
}

async function seed() {
  await dropDatabase();
  await fillDatabase();
  process.exit(0);
}
seed();
