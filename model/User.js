var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
     'username': {
         type: String,
         unique: true
     },
     'password': String,
     'avatar': {
          type: String,
          default: 'default_avatar.png'
     },
    'github': {
        type: String,
        default: ''
    },
    'email': {
        type: String,
        default: ''
    },
    'registeremail': {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
