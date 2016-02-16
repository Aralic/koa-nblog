// 注册
$('#register').click(function() {
  var _user = {
    username: $('#username').val(),
    password: $('#password').val()
  };

  if (_user.username && _user.password) {
    $.ajax({
          url: '/api/register',
          type: 'get',
          data: {
            username: $('#username').val(),
            password: $('#password').val()
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
$('#login').click(function () {
    var _user = {
        username: $('#username').val(),
        password: $('#password').val()
    }

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

})
