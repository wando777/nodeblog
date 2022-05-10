const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const slugify = require("slugify");
const Article = require("../articles/Article");
const Category = require("./Category");

router.get("/categories", (req, res) => {
    res.send("Rota de categorias");
});

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined && title != "") {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        })
    } else {
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categoriesFromPage => {
        res.render("admin/categories/index", { categories: categoriesFromPage });
    })
});

router.post("/categories/delete", (req, res) => {
    var idPage = req.body.idInput;
    if (idPage != undefined && !isNaN(idPage)) {
        Category.destroy({
            where: { id: idPage }
        }).then(() => {
            res.redirect("/admin/categories");
        })
    } else {
        res.redirect("/admin/categories");
    }

});

router.get("/admin/categories/edit/:id", (req, res) => {
    var idPage = req.params.id;

    Category.findByPk(idPage).then(category => {
        if (category != undefined && !isNaN(idPage)) {
            res.render("admin/categories/edit", {
                category: category
            });
        } else {
            res.redirect("/admin/categories")
        }
    }).catch(error => {
        res.redirect("/admin/categories");
    })
});

router.post("/categories/update", (req,res)=>{
    var idPage = req.body.idFromEdit;
    var titlePage = req.body.title;
    Category.update({title: titlePage, slug: slugify(titlePage)},{
        where:{id: idPage}
    }).then(()=>{
        res.redirect("/admin/categories");
    });
});

module.exports = router;