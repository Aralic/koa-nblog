
var userService = require('../service/user');
var blogService = require('../service/blog');
var _ = require('underscore');
// 注册
exports.register = function *register() {
    var _user = this.request.query;
    var result = yield userService.validateUsername(_user.username);
    if (!result) {
        var addResult = yield userService.insertUser({
            username: _user.username,
            password: _user.password
        });
        if (addResult) {
            this.session.username = _user.username;
            this.body = {
                errStr: 'success',
                errNo: 0
            };
        }
        else {
            this.body = {
                errStr: 'register fail',
                errNo: 2
            };
        }
    }
    else {
        this.body = {
            errStr: 'username repeat',
            errNo: 1
        };
    }

};
// 登录
exports.login = function *login() {
    var _user = this.request.body;
    var result = yield userService.findUser(_user.username, _user.password);
    if (result) {
        this.session.username = _user.username;
        this.body = {
            errStr: 'success',
            errNo: 0
        };
    }
    else {
        this.body = {
            errStr: 'fail',
            errNo: 1
        };
    }
};

// 发布博客
exports.postblog = function *postblog() {
    var body = this.request.body;
    var data = {};
    var result;
    if (this.session.username) {
        data = _.extend(data, body);
        data.author = this.session.username;
        data.updatadate = new Date();

        result = yield blogService.insertBlog(data);
        if (result) {
            this.body = {
                errStr: 'success',
                errNo: 0
            };
        }
        else {
            this.body = {
                errStr: 'fail',
                errNo: 1
            };
        }
    }
    else {
        this.body = {
            errStr: 'fail, plase login in',
            errNo: 1
        };
    }

};



