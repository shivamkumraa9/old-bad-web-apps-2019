const mongoose = require('mongoose');


const FormSchema = new mongoose.Schema({
	name : {type:String,required:true}, 
	success : String,
	whitelist : [{type:String}],
	isemail :{type:Boolean,default : false},
	email : String,
	submissions : [{data:String,time: {type : Date, default : Date.now}}],
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


const Form = mongoose.model('Form',FormSchema);
module.exports = Form;