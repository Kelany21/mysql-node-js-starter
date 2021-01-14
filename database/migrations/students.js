const db = require('../db');
const sequelize = db.sequelize;

class Student extends db.Model {}
Student.init({
    username: db.DataTypes.STRING,
    birthday: db.DataTypes.DATE
}, { sequelize, modelName: 'student' });

module.exports = Student;
