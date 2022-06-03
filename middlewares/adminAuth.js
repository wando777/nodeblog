function adminAuth(req, res, next) {
    var isAuthenticated = req.session.user ? next() : res.redirect("/admin/login");
}

module.exports = adminAuth;