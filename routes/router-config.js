var router = require('koa-router')();
var ucenter = require('./ucenter');
var api = require('./api');
var path = require('path');
var koaBody = require('koa-body')({
    "multipart":true
});

// 首页
router.get('/', require('./index'));
router.get('/index', require('./index'));

// 用户中心
router.get('/users', require('./users'));
// 注册登录页
router.get('/register', require('./register'));
// 用户个人中心
router.get('/ucenter/myblog', ucenter.myblog);
router.get('/ucenter/setting', ucenter.setting);
router.get('/ucenter/addblog', ucenter.addblog);
router.get('/ucenter/drafts', ucenter.drafts);
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
// 上传头像
router.post('/api/uploadavator', koaBody, api.uploadavator);

module.exports = router;