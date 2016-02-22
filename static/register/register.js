
// 注册
$('#register').on('click', '.register-btn', function() {
  var _user = {
    username: $('#register .username').val(),
    password: $('#register .password').val(),
      passwordrepeat: $('#register .password-repeat').val(),
      email: $('#register .email').val()
  };

  if (_user.password === _user.passwordrepeat && _user.username && _user.password && _user.email) {
    $.ajax({
          url: '/api/register',
          type: 'post',
          data: {
            username: _user.username,
            password: _user.password,
              email: _user.email
          }
        })
        .done(function(res) {
          if (!res.errNo) {
            window.location.href = '/';
          } else {
            alert('注册失败!');
          }
        });
  }
  else {
    alert('帐号密码不得为空');
  }

});

// 登录
$('#login').on('click', '.login-btn', function () {
    var _user = {
        username: $('#login .username').val(),
        password: $('#login .password').val()
    };

    if (_user.username && _user.password) {
      $.ajax({
            url: '/api/login',
            type: 'post',
            data: _user
          })
          .done(function(res) {
            if (!res.errNo) {
                var result = location.search.match(/redirect=([^&]*)(&|$)/);
                var redirect = '/';
                if (result && result[1]) {
                    redirect = result[1];
                }
                window.location.href = redirect;
            } else {
              alert('登录失败!');
            }
          });
    }
    else {
        alert('帐号密码不得为空');
    }
});

$('.wrap').on('click', '[rel]', function () {
    var action = $(this).attr('rel');
    var $box = $('.box');
    var width = $box.width();
    if (action === 'register') {
        $box.animate({
            left: -width/2
        }, 400);
    }
    else {
        $box.animate({
            left: 0
        }, 400);
    }
});

var type = location.search.match(/type=(\w+)/);
if (type && type[1] === 'register') {
    $('[rel=register]').trigger('click');
}
