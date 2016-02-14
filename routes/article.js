var blogService = require('../service/blog');

module.exports = function *article() {
    var id = this.params.id;
    var article = yield blogService.findOneBlog(id);
    yield this.render('article', {
        title: '博客详情页',
        username: this.session.username ? this.session.username : null,
        article: article ? article : null
    });
};
