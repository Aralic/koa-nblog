var userService = require('../service/user');
var blogService = require('../service/blog');
var path = require('path');
var _ = require('underscore');
var fs = require('fs');
var save = require('koa-save-to-file');
var config = require('../config');

var acceptAvatarType = ['jpg', 'jpeg', 'png'];

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
    var result = yield userService.findUser({
        username: _user.username,
        password: _user.password
    });

    if (result) {
        this.session.username = _user.username;
        this.body = config.res[0];
    }
    else {
        this.body = config.res[3];
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
            this.body = config.res[0];
        }
        else {
            this.body = config.res[1];
        }
    }
    else {
        this.body = config.res[4];
    }

};

// 上传头像
exports.uploadavator = function *() {
    var username = this.session.username;
    var postParams = this.request.body.fields;
    var file = this.request.body.files.file;
    var tmpath= file.path;
    var ext = path.extname(file.name);
    if (acceptAvatarType.indexOf(ext.substr(1).toLowerCase()) > -1) {
        var avatarName = username + '-'+parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext;
        var newpath =path.join('../static/avatar', avatarName);
        var result = yield userService.updateUser({username: username}, {avatar: avatarName});
        if (result) {
            var readStream = fs.createReadStream(tmpath);
            readStream.pipe(fs.createWriteStream(newpath));
            this.body = _.extend({data: {avatar: avatarName}}, config.res[0]);
        }
        else {
            this.body = config.res[1];
        }
    }
    else {
        this.body = config.res[5];
    }
};

// 保存个人信息
exports.savauserinfo = function *() {
    var body = this.request.body;
    var result = yield userService.updateUser({username: this.session.username}, {
        email: body.email,
        github: body.github
    });

    if (result) {
        this.body = config.res[0];
    }
    else {
        this.body = config.res[1];
    }
};

// 删除个人博客
exports.deletemyblog = function *() {
    var body = this.request.body;
    var username = this.session.username;
    var id = body.id;
    //Blob.
    var result = yield blogService.deleteBlog({
        author: username,
        _id: id
    });

    if (result) {
        this.body = config.res[0];
    }
    else {
        this.body = config.res[1];
    }

};