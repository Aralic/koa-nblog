var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nBlog');

module.exports = {
    User: require('./User'),
    Blog: require('./Blog')
};

