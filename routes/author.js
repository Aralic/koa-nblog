var blogService = require('../service/blog');

module.exports = function *article() {
    var author = this.params.author;
    var articles = yield blogService.findAuthorBlog(author);
    yield this.render('author', {
        title: '个人详情页',
        username: this.session.username ? this.session.username : null,
        articles: articles ? articles : null
    });
};
