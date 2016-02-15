var curIndex = location.search.match(/page=(\d+)$/);
curIndex = curIndex && parseInt(curIndex[1]) || 1;
var pager = new Pager({
    pContainer: '#pager',
    conTotalCount: pCount,
    onIndexChange: function (curIndex) {
        location.href = location.pathname + '?page=' + curIndex;
    },
    conPerPage: 5,
    pMaxCount: 11,
    curIndex: curIndex
});