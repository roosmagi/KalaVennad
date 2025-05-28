const Sequelize = require('sequelize');

const sequelize = new Sequelize('kalavennad', 'root', 'Qwerty', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;