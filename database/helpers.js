const db = require('./db');
const queryInterface = db.sequelize.getQueryInterface();
const User = require('./migrations/users');
// const Student = require('./migrations/students');
const users = require('./seeders/users');
const dotenv = require('dotenv');
dotenv.config();

module.exports.migrate = async () => {
    const drop = process.env.DROP_ALL_TABLES || true;
    if (drop){
        console.log('\n----------START DROP ALL TABLE----------\n');
        try {
            await queryInterface.dropAllTables();
        }catch (e) {
            console.log(e)
        }
        console.log('\n----------END DROP ALL TABLE----------\n');
    }
    console.log('\n----------START MIGRATIONS----------\n');
    await db.sequelize.sync();
    console.log('\n----------END MIGRATIONS----------\n');
};

module.exports.seed = async () => {
    console.log('\n----------START SEEDING----------\n');
    await User.bulkCreate(users);
    console.log('\n----------END SEEDING----------\n');
};