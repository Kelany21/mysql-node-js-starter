const db = require('../db');
const sequelize = db.sequelize;

class User extends db.Model {}
User.init({
    username: db.DataTypes.STRING,
    email: db.DataTypes.STRING,
    password: db.DataTypes.STRING,
    is_admin: db.DataTypes.BOOLEAN,
    token: db.DataTypes.STRING
}, { sequelize, modelName: 'user' });

module.exports = User;
