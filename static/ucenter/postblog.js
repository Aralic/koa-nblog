// 发布博客
$('#postBlog').click(function () {
    var title = $('#articleTitle').val();
    var content = $('#articleContent').val();

    if (!title || !content) {
        alert('内容不能为空');
        return false;
    }

    $.ajax({
        url: '/api/postblog',
        type: 'post',
        data: {
            title: title,
            content: content
        }
    })
    .then(function (res) {
        if (res.errNo) {
            res.errStr ? alert(res.errStr) : alert('失败,请重试!');
            return false;
        }
        alert('发布成功');
        window.location.href = '/';
    });
});