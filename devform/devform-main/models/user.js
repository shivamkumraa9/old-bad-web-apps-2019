const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
	fullname : {type:String,required:true}, 
	email : {type:String,required:true},
	password : {type:String,minLength:6,required:true},
	customer_id : String,
	subscription_id : String,
	has_subscription :{type:Boolean,default : false},
	current : {type:String,default:"free"},
	password_token : {type:String},
	is_cancel : {type:Boolean,default : false},
	date : {type: String},
	api_key : {type: String},
	has_card : {type:Boolean,default : false},
	total : {type:Number,default : 0},
    forms : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Form'}
    ]
})


const User = mongoose.model('User',UserSchema);
module.exports = User;