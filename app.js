var app = require('koa')()
  , router = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var mongoose = require('mongoose');
var session = require('koa-session-store');
var mongooseStore = require('koa-session-mongoose');
var xtpl = require('xtpl/lib/koa');
var xtemplate = require('xtemplate');
//xtemplate模板渲染
xtpl(app,{
    //配置模板目录，指向工程的view目录
    views: __dirname + '/views'
});

// 拓展模板命令
xtemplate.addCommand('formateTime',function(scope, option){
    var time = option.params[0];
    var result = time.getFullYear() + '-' + (time.getMonth() + 1)+'-'+time.getDate() +' '+ time.getHours()+':'+time.getMinutes();
    return result;
});

// global middlewares
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname));


// session
app.keys = ['some secret key'];  // needed for cookie-signing

app.use(session({
    store: mongooseStore.create()
}));
// mount root
app.use(require('./routes/router-config').routes());
app.use(router.allowedMethods());

app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
});
module.exports = app;
