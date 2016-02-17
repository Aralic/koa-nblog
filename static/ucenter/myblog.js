var curIndex = location.search.match(/page=(\d+)/);
curIndex = curIndex && parseInt(curIndex[1]) || 1;
var deleteId;
var pager = new Pager({
    pContainer: '#pager',
    conTotalCount: pCount,
    onIndexChange: function (curIndex) {
        location.href = '/ucenter/myblog?page=' + curIndex;
    },
    conPerPage: 5,
    pMaxCount: 11,
    curIndex: curIndex
});

$('#main').on('click', '.delete', function () {
    deleteId = $(this).data('id');
});

$('#confirm').click(function () {
    $.ajax({
        url: '/api/deletemyblog/',
        type: 'post',
        data: {
            id: deleteId
        }
    })
    .then(function (res) {
        if (!res.errNo) {
            location.reload();
        }
        else {
            alert(res.errStr);
        }
    });
});