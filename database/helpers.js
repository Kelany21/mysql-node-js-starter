const db = require('./db');
const queryInterface = db.sequelize.getQueryInterface();
const seeders = require('./seeders/seeder');
const dotenv = require('dotenv');
dotenv.config();

module.exports.migrate = async () => {
    try {
        const drop = process.env.DROP_ALL_TABLES || true;
        if (drop) {
            console.log('\n----------START DROP ALL TABLE----------\n');
            await queryInterface.dropAllTables();
            console.log('\n----------END DROP ALL TABLE----------\n');
        }
        console.log('\n----------START MIGRATIONS----------\n');
        await db.sequelize.sync();
        console.log('\n----------END MIGRATIONS----------\n');
    } catch (e) {
        console.log(e)
    }
};

module.exports.seed = async () => {
    try {
        console.log('\n----------START SEEDING----------\n');
        for (let i = 0; i < seeders.length; i++){
            await seeders[i].model.bulkCreate(seeders[i].data);
        }
        console.log('\n----------END SEEDING----------\n');
    } catch (e) {
        console.log(e)
    }
};