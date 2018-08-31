var mysql = require("mysql");
var config = require("../../config/default.json");
var connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});
connection.connect((error) => {
    if(error) {
        console.log("error");
    } else {
        console.log("Connect");
    }
});

function getConnection() {
    if(!connection) {
        connection.connect();
    }
    return connection;
}
module.exports = {
    getConnection: getConnection
}