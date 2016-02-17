var router = require('koa-router')();
var ucenter = require('./ucenter');
var api = require('./api');
var auth = require('../service/auth');
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
// 注销账号
router.get('/loginout', require('./loginout'));
// 用户个人中心
router.get('/ucenter/myblog', auth, ucenter.myblog);
router.get('/ucenter/setting', auth, ucenter.setting);
router.get('/ucenter/addblog', auth, ucenter.addblog);
router.get('/ucenter/drafts', auth, ucenter.drafts);
// 博客详情页
router.get('/article/:id', require('./article'));
// 作者页
router.get('/author/:author', require('./author'));

// 注册接口
router.get('/api/register', api.register);
// 登录接口
router.post('/api/login', api.login);
// 发布博客
router.post('/api/postblog', auth, api.postblog);
// 上传头像
router.post('/api/uploadavator', auth, koaBody, api.uploadavator);
// 保存个人信息
router.post('/api/savauserinfo', auth, api.savauserinfo);
// 删除自己博客
router.post('/api/deletemyblog', auth, api.deletemyblog);


module.exports = router;