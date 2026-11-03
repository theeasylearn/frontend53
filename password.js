const bcrypt = require('bcrypt');

let hashPassword = function (password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
let comparePassword = function(HashedPassword,password){
    return bcrypt.compare(password,HashedPassword);
}
module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;