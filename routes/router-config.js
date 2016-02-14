var router = require('koa-router')();
var ucenter = require('./ucenter');
var api = require('./api');

// 首页
router.get('/page/:id', require('./index'));
router.get('/', require('./index'));

// 用户中心
router.get('/users', require('./users'));
// 注册登录页
router.get('/register', require('./register'));
// 用户个人中心
router.get('/myblog', ucenter.myblog);
router.get('/setting', ucenter.setting);
router.get('/addblog', ucenter.addblog);
router.get('/drafts', ucenter.drafts);


// 博客详情页
router.get('/article/:id', require('./article'));
// 作者页
router.get('/author/:author', require('./author'));
// 注册接口
router.get('/api/register', api.register);
// 登录接口
router.post('/api/login', api.login);
// 发布博客
router.post('/api/postblog', api.postblog);
module.exports = router;