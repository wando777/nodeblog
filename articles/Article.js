const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    }, body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article);      // A category has many articles
Article.belongsTo(Category);    // An article belongs to only one category

Article.sync();

module.exports = Article;