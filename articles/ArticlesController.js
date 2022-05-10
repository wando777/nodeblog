const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");


router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articleFromDb => {
        res.render("admin/articles/index", { articles: articleFromDb });
    });
});

router.get("/admin/articles/new", (req, res) => {
    //Passing category to list all categories in a dropdown
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    });
});

router.post("/articles/save", (req, res) => {
    var titlePage = req.body.title;
    var bodyPage = req.body.body;
    var categoryPage = req.body.categoryArticle;

    console.log(titlePage);
    console.log(bodyPage);
    console.log(categoryPage);

    Article.create({
        title: titlePage,
        slug: slugify(titlePage),
        body: bodyPage,
        categoryId: categoryPage
    }).then(() => {
        res.redirect("/admin/articles");
    })
});

router.post("/articles/delete", (req, res) => {
    var idPage = req.body.idInput;
    if (idPage != undefined && !isNaN(idPage)) {
        Article.destroy({
            where: { id: idPage }
        }).then(() => {
            res.redirect("/admin/articles");
        })
    } else {
        res.redirect("/admin/articles");
    }
});



module.exports = router;