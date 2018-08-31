var express = require('express');

var router = express.Router();

router.get("/", (req, res) => {
    res.json({"messages" : "This is Blog Page"});
});

module.exports = router;