//function
var blogService = require('../service/blog');

module.exports = function *index() {
    var pageId = this.params.id || 1;
    var articles = yield blogService.findBlog(pageId);
    var pCount = yield blogService.findAllCount();
    yield this.render('index', {
        title: '博客首页',
        username: this.session.username ? this.session.username : null,
        articles: articles ? articles : null,
        curPageId: parseInt(pageId),
        pCount: pCount
    });
};
