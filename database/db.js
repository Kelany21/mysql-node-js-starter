const dotenv = require('dotenv');
dotenv.config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
     dialect: 'mysql'
});

module.exports = {
     Model, DataTypes, sequelize
};