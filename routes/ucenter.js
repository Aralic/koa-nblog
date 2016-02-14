exports.myblog = function *() {
    yield this.render('ucenter/myblog', {
        title: '我的博客',
        username: this.session.username ? this.session.username : null
    });
};

exports.setting = function *() {
    yield this.render('ucenter/setting', {
        title: '我的设置',
        username: this.session.username ? this.session.username : null
    });
};

exports.addblog = function *() {
    yield this.render('ucenter/addblog', {
        title: '添加博客',
        username: this.session.username ? this.session.username : null
    });
};

exports.drafts = function *() {
    yield this.render('ucenter/drafts', {
        title: '草稿箱',
        username: this.session.username ? this.session.username : null
    });
};