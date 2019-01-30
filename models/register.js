var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var registerSchema = new Schema({
   group:String,
    name:String,
    num:String,
    leader:Boolean,
    date:String,
    passwd:String
    
},{collection:'register'});

module.exports = mongoose.model('register',registerSchema);