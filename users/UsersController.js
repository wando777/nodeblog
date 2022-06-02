const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req, res) => {
    res.send('List users');
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.create({
        login: login,
        password: hash
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        res.send(err);
    })

    // res.json({
    //     login,
    //     password,
    //     hash
    // });
});

module.exports = router;