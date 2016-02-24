var blogService = require('../service/blog');

module.exports = function *() {
    var author = this.params.author;
    var pageId = this.request.query.page || 1;

    var articles = yield blogService.findBlog({pageId: pageId}, {author: author});
    var pCount = yield blogService.findAllCount({author: author});
    yield this.render('author', {
        title: '个人详情页',
        username: this.session.username ? this.session.username : null,
        articles: articles ? articles : null,
        curPageId: parseInt(pageId),
        pCount: pCount
    });
};
