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

router.get("/admin/articles/edit/:id", (req, res) => {
    var idPage = req.params.id;

    Article.findByPk(idPage).then(article => {
        if (article != undefined && !isNaN(idPage)) {

            //Passing category to list all categories in a dropdown
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", { article: article, categories: categories })
            });

        } else {
            res.redirect("/admin/articles")
        }
    }).catch(error => {
        res.redirect("/admin/articles");
    })
});

router.post("/articles/update", (req, res) => {
    var id = req.body.idHidden;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.categoryArticle;
    Article.update({ title: title, body: body, categoryId: category, slug: slugify(title) }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(error => {
        res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var offSet = 0;
    var pageLimit = 2;

    if (!isNaN(page) || page != 0) {
        offSet = parseInt(page) * pageLimit;
    }

    Article.findAndCountAll({
        limit: pageLimit,
        offset: offSet,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        var next = true;
        if (offSet + pageLimit >= articles.count) {
            next = false
        }
        // console.log(parseInt(page));
        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories =>{
            res.render("admin/articles/page", {result: result, categories: categories})
        });

    });
})

module.exports = router;