var User = require('../model/index').User;

exports.insertUser = function *(userToInsert) {
    return yield User.create(userToInsert);
};

exports.findUser = function *(select) {

    return yield User.findOne(select).exec();
};

exports.validateUsername = function *(username) {
    return yield User.findOne({username: username}).exec();
};

exports.updateUser = function *(query, update) {
    return yield User.update(query, {$set: update}).exec();
};
