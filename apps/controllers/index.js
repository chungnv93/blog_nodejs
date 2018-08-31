var express = require('express');

var router = express.Router();

router.use('/admin', require(__dirname + '/admin'));
router.use('/blog', require(__dirname + '/blog'));

router.get("/", (req, res) => {
    res.render("test");
});


module.exports = router;