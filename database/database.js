const Sequelize = require('sequelize');

const connection = new Sequelize('portaldiscussao', 'root', '19031993', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;