module.exports = function *() {
    if (this.session.username) {
        this.session.username = null;
        this.response.redirect('/');
    }
};
