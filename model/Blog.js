var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BlogSchema = new mongoose.Schema({
    'title': String,
    'content': String,
    'author': {
        type: String,
        default: 'www'
    }
}, {timestamps:{createdAt: 'created_at',  updatedAt: 'updated_at'}});

module.exports = mongoose.model('Blog', BlogSchema);
