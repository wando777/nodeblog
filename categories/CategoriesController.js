const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const slugify = require("slugify");
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
            res.redirect("/");
        })
    } else {
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories", (req,res)=>{
    res.render("admin/categories/index");
});

module.exports = router;