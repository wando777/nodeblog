const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req, res) => {

    User.findAll().then(users => {
        res.render("admin/users/index", { users: users })
    });
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    //It verifies if there's another user with the same login
    User.findOne({
        where: {
            login: login
        }
    }).then(user => {
        if (user == undefined) {
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
        } else {
            res.redirect("/admin/users/create");
        }
    });

    // res.json({
    //     login,
    //     password,
    //     hash
    // });
});

router.get("/admin/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    //Authentication logic
    User.findOne({
        where: {
            login: login
        }
    }).then(user => {
        if (user != undefined) { //In case there's an user with this login
            var passwordIsCorrect = bcrypt.compareSync(password, user.password) ?
                (req.session.user = { id: user.id, login: user.login }, res.redirect("/")) : res.redirect("/admin/login");

        } else {
            res.redirect("/admin/login");
        }
    });

})

//User logout
router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;