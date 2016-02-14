var User = require('../model/index').User;

exports.insertUser = function *(userToInsert) {

    return yield User.create(userToInsert);
};

exports.findUser = function *(username, password) {

    return yield User.findOne({username: username, password: password}).exec();
};

exports.validateUsername = function *(username) {

    return yield User.findOne({username: username}).exec();
};
