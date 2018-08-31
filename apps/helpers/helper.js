var bcrypt = require("bcrypt");
var config = require("../../config/default.json");
function hash_password(password) {
    var saltRound = config.salt;
    var salt = bcrypt.genSaltSync(saltRound);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compare_password(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hash_password: hash_password,
    compare_password: compare_password
};