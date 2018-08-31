var express = require('express');

var router = express.Router();
var user_md = require("../models/user");
var helper = require("../helpers/helper");
router.get("/", (req, res) => {
    res.json({"messages" : "This is Admin Page"});
});
router.get("/sign-up", (req, res) => {
    res.render("signup", {data: {}});
});

router.post("/sign-up", (req, res) => {
    var user = req.body;
    if(user.email.trim().length == 0) {
        res.render("signup",{data:{error: "Email is required!"}});
    }
    if(user.passwd.trim().length == 0) {
        res.render("signup",{data:{error: "Password is required!"}});
    }
    if(user.passwd != user.repasswd && user.passwd.trim().length != 0) {
        res.render("signup",{data:{error: "Password is not match!"}});
    }

    // Insert to DB
    user = {
        email: user.email,
        password: helper.hash_password(user.passwd),
        firstName: user.firstname,
        lastName: user.lastname
    }
    var result = user_md.addUser(user);
    result.then((data) => {
        res.redirect("/admin/sign-in");
    }).catch((error) => {
        res.render("signup",{data:{error: error}});
    });
});

router.get("/sign-in", (req, res) => {
    res.render("signin", {data: {}});
});

router.post("/sign-in", (req, res) => {
    var user = req.body;
    if(user.email.trim().length == 0) {
        res.render("signin",{data:{error: "Email is required!"}});
    }
    if(user.passwd.trim().length == 0) {
        res.render("signin",{data:{error: "Password is required!"}});
    }
    var data = user_md.getUserByEmail(user.email);
    console.log(data);
    if(data) {
        data.then((users) => {
            var userEmail = users[0]
            var status = helper.compare_password(user.passwd, userEmail.password);
            if(!status) {
                res.render("signin",{data:{error: "Password Wrong!"}});
            } else {
                req.session.user = userEmail;
                console.log(req.session.user);
                res.redirect("/admin");
            }
        });
    } else {
        res.render("signin",{data:{error: "User not exists!"}});
    }
});
module.exports = router;