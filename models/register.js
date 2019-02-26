var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var registerSchema = new Schema({
   group:String,
    name:String,
    num:String,
    auth:String,
    date:String,
    passwd:String,
    trip:String,
    checkin1:Boolean,
    checkin2:Boolean
    
},{collection:'register'});

module.exports = mongoose.model('register',registerSchema);