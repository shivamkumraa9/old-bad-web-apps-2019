const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
	username : {type:String,unique: false}, 
	email : {type:String,unique:true},
	password : String,
	customer_id : String,
	subscription_id : String,
	is_active : {type:Boolean,default : false},
	is_cancel : {type:Boolean,default : false},
	is_admin : {type:Boolean,default : false},
})


const User = mongoose.model('User',UserSchema);
module.exports = User;