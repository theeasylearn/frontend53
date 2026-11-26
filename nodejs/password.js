const bcrypt = require('bcrypt');

let hashPassword = function (password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
let comparePassword = function (HashedPassword, password) {
    return bcrypt.compare(password, HashedPassword);
}
let generatePassword = function () {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * characters.length);
        password += characters[index];
    }
    return password;
}
module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
module.exports.generatePassword = generatePassword;