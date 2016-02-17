var avatarInput = $('#avatarInput')[0];
avatarInput.onchange = function () {
    uploadAvator(this.files[0]);
};
$('.avatar-btn').click(function () {
    avatarInput.click();
});
// clear input[type=file] 缓存
function clearCache(file) {
    var form=document.createElement('form');
    document.body.appendChild(form);
    var pos = file.nextSibling;
    form.appendChild(file);
    form.reset();
    pos.parentNode.insertBefore(file, pos);
    document.body.removeChild(form);
}

// 上传头像
function uploadAvator(file) {
    var formData = new FormData();
    formData.append('file', file);
    $('#updataAvatar').html('正在上传').attr('disabled', true);
    $.ajax({
        url: '/api/uploadavator',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(function (res) {
        if (res.errNo) {
            alert(res.errStr);
            return false;
        }
        clearCache(avatarInput);
        $('#updataAvatar').prop('disabled', false).delay(3000).html('更换');
        $('#avatar').attr('src', '/static/avatar/'+res.data.avatar);
    });
}

$('#save').click(function () {
    var email = $('#email').val();
    var github = $('#github').val();
    if (email !== userinfo.email || github !== userinfo.github) {
        $.ajax({
            url: '/api/savauserinfo',
            type: 'post',
            data: {
                email: email,
                github: github
            }
        })
        .then(function (res) {
            if (!res.errNo) {
                userinfo.email = email;
                userinfo.github = github;
                alert('保存成功');
                return;
            }
            alert(res.errStr);
        });
    }
    else {
        alert('保存成功');
    }
});