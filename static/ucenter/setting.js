var avatarInput = $('#avatarInput')[0];
avatarInput.onchange = function () {
    uploadAvator(this.files[0]);
};
$('.avatar-btn').click(function () {
    avatarInput.click();
});

function uploadAvator(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('aaa', '111');
    $.ajax({
        url: '/api/uploadavator',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(function (res) {

    });
}