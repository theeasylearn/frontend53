const bcrypt = require('bcrypt');

let hashPassword = function (password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

module.exports.hashPassword = hashPassword;