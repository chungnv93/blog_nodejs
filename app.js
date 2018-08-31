var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var config = require("./config/default.json");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// express session
app.set('trust proxy', 1)
app.use(session({
    secret: config.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// views
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// Config static folder
app.use("/static", express.static(__dirname + "/public"));


// Connect Controller
var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);


// connect server
var host = config.server.host;
var port = config.server.port;

app.listen(port, () => {
    console.log("Server running on port", port);
});