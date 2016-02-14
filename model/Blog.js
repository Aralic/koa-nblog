var mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
    'title': String,
    'content': String,
    'updatadate': {
        type: Date,
        default: Date.now
    },
    'author': {
        type: String,
        default: 'www'
    }
});

module.exports = mongoose.model('Blog', BlogSchema);
