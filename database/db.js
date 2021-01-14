const dotenv = require('dotenv');
dotenv.config();
const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql'
});

module.exports = {
    Model, DataTypes, sequelize
};

module.exports.migrateAndSeed = async () => {
    try {
        const drop = process.env.DROP_ALL_TABLES ? (process.env.DROP_ALL_TABLES == 'true') : true;
        if (drop) {
            console.log('\n----------START DROP ALL TABLE----------\n');
            const queryInterface = sequelize.getQueryInterface();
            await queryInterface.dropAllTables();
            console.log('\n----------END DROP ALL TABLE----------\n');
            console.log('\n----------START MIGRATIONS----------\n');
            await sequelize.sync();
            console.log('\n----------END MIGRATIONS----------\n');
        }
        console.log('\n----------START SEEDING----------\n');
        const seeders = require('./seeders/seeder');
        for (let i = 0; i < seeders.length; i++){
            if (seeders[i].model.allowToSeed){
                await seeders[i].model.Model.bulkCreate(seeders[i].data);
            }
        }
        console.log('\n----------END SEEDING----------\n');
    } catch (e) {
        console.log(e)
    }
}