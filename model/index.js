var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:22017/nBlog');

module.exports = {
    User: require('./User'),
    Blog: require('./Blog')
};

