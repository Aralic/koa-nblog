var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
     'username': {
         type: String,
         unique: true
     },
     'password': {
         type: String,
         require: true
     },
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
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', UserSchema);
