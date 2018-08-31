var db = require("../common/database");
var db = db.getConnection();
var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255), password VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255), created_at DATETIME, updated_at DATETIME)";
db.query(sql, (error, result) => {
    if(error) {
        throw error;
    } else {
        console.log("Create table successfull!");
    }
});
db.end();
