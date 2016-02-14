
module.exports = function *() {
    if (this.session.username) {
        this.response.redirect('/');
    }
    else {
        yield this.render('register', {
            title: 'register'
        });
    }
};
