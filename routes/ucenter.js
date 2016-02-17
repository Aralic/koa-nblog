/**
 * 用户中心
 * 如果用户未登陆，则跳转到登陆页
 */
var blogService = require('../service/blog');
var userService = require('../service/user');

exports.myblog = function *() {
    var author = this.session.username;
    var pageId = this.request.query.page || 1;

    if (author) {
        var articles = yield blogService.findBlog({pageId: pageId}, {author: author});
        var pCount = yield blogService.findAllCount({author: author});
        yield this.render('myblog', {
            title: '我的博客',
            username: this.session.username ? this.session.username : null,
            articles: articles ? articles : null,
            pCount: pCount
        });
    }
    else {
        this.response.redirect('/register?redirect=ucenter/myblog');
    }

};

exports.setting = function *() {
    var username = this.session.username;
    if (username) {
        var userdata = yield userService.findUser({
            username: username
        });
        if (userdata) {
            this.response.redirect('/register?redirect=ucenter/setting');
        }
        else {
            yield this.render('setting', {
                title: '我的设置',
                user: userdata,
                username: username
            });
        }

    }
    else {
        this.response.redirect('/register?redirect=ucenter/setting');
    }

};

exports.addblog = function *() {
    if (this.session.username) {
        yield this.render('addblog', {
            title: '添加博客',
            username: this.session.username ? this.session.username : null
        });
    }
    else {
        this.response.redirect('/register?redirect=ucenter/addblog');
    }
};

exports.drafts = function *() {
    if (this.session.username) {
        yield this.render('drafts', {
            title: '草稿箱',
            username: this.session.username ? this.session.username : null
        });
    }
    else {
        this.response.redirect('/register?redirect=ucenter/drafts');
    }
};