var router = require('koa-router')();
var ucenter = require('../controller/ucenter');
var api = require('../controller/api');
var auth = require('../service/auth');
var koaBody = require('koa-body')({
    "multipart":true
});

// 首页
router.get('/', require('../controller/index'));
router.get('/index', require('../controller/index'));

// 用户中心
router.get('/users', require('../controller/users'));
// 注册登录页
router.get('/login', require('../controller/login'));
// 注销账号
router.get('/loginout', require('../controller/loginout'));
// 用户个人中心
router.get('/ucenter/myblog', auth, ucenter.myblog);
router.get('/ucenter/setting', auth, ucenter.setting);
router.get('/ucenter/addblog', auth, ucenter.addblog);
router.get('/ucenter/drafts', auth, ucenter.drafts);
// 博客详情页
router.get('/article/:id', require('../controller/article'));
// 作者页
router.get('/author/:author', require('../controller/author'));
// 更新博客页
router.get('/editblog/:id', auth, require('../controller/editblog'));

// 注册接口
router.post('/api/register', api.register);
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
// 更新自己博客
router.post('/api/updateblog', auth, api.updateblog);

module.exports = router;