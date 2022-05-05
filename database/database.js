const Sequelize = require("sequelize");

const connection = new Sequelize('nodeblog', 'root', 'VTEX2022',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;