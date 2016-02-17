/**
 * 检验用户是否登录了
 * 如果没登录,跳转到首页
 */
module.exports = function *(next) {
   if (this.session.username) {
       yield next;
   }
   else {
       this.response.redirect('/register');
   }
};