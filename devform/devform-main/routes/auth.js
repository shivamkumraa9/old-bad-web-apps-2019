const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const router = express.Router();

const User = require('../models/user')

const login_required = require('../extras/login_required')
const stripe = require('stripe')(process.env.STRIPE);

router.post("/register",async (req,res)=>{
	const {fullname,email,password} = req.body
	if (fullname && email && password){
		if(password.length >= 6){
			const hash = await bcrypt.hash(password,10)
			let email_in_db = await User.findOne({email})
			if (email_in_db){
				return res.json({okay:false,msg:"Email Already Exists"})
			}
			const user = await User({fullname,email,password:hash}).save()
			const customer = await stripe.customers.create({email:user.email})
			user.customer_id = customer.id
			user.api_key = await bcrypt.hash(Math.random().toString(36),16)
			user.save()
			return res.json({okay:true})
		}
		return res.json({okay:false,msg:"Password length should be atleast 6"})	
	}
	return res.json({okay:false,msg:"Incomplete Data"})
})


router.post("/login",async (req,res)=>{
	const {email,password} = req.body
	if (email && password){
		let user = await User.findOne({email})
		if (user){
			const result = await bcrypt.compare(password,user.password)
			if(result){
				const token = await jwt.sign({username:user.username,email:user.email},process.env.TOKEN)
				return res.json({okay:true,token})
			}
		}
		return res.json({okay:false,msg:"Invalid Email/Password"})
	}
	return res.json({okay:false,msg:"Incomplete Data"})
})

router.post("/profile",login_required,async (req,res)=>{
	res.json({loading:false,
		current:req.user.current,
		is_canceled:req.user.is_cancel,
		has_subscription : req.user.has_subscription,
		has_card:req.user.has_card,
		info:{email:req.user.email,name:req.user.fullname},
		date : req.user.date ? req.user.date : '',
	})
})

router.post("/set-info",login_required,async (req,res)=>{
	if(req.body.name){
		req.user.fullname = req.body.name
		req.user.save()
		return res.json({okay:true})
	}
	res.json({okay:false})
})

router.post("/reset-password",async (req,res)=>{
	const {email} = req.body
	if(email){
		const user = await User.findOne({email:email})
		if(user){
			const token = await jwt.sign({email:email},process.env.PASSWORDTOKEN)
			const transporter = nodemailer.createTransport({service: 'gmail',auth: {user: process.env.EMAIL,pass: process.env.PASSWORD}});
			const mailOptions = {
			  from: process.env.EMAIL,
			  to: email,
			  subject: 'Password Reset',
			  text: `Reset your password  https://devform.herokuapp.com/password-resetperform/${token}`
			};
			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    console.log(error);
			    res.status(400)
			    return res.json({okay:false})
			  }
			})
			user.password_token = token
			user.save()
		}
	}
	return res.json({okay:true})
})

const verify_token_util = async (token)=>{
	try{
		const {email} = jwt.verify(token,process.env.PASSWORDTOKEN)
		let user = await User.findOne({email,password_token:token})
		if(user){
			return {is_okay:true,user:user}
		}
	}catch(err){}
	return {is_okay:false,user:'user'}
}
const change_password_util = async (user,body,reset)=>{
	const {password1,password2} = body;
	if((password1 && password2) && (password1 === password2) && (password1.length >= 6)){
		const hash = await bcrypt.hash(password1,10)
		user.password = hash;
		if(reset){
			user.password_token = 'zzz'
		}
		user.save()
		return true
	}
	return false
}

router.post("/performreset-password/:token",async (req,res)=>{
	const {is_okay,user} = await verify_token_util(req.params.token)
	if(is_okay){
		const changed = await change_password_util(user,req.body,true)
		return res.json({okay:changed})
	}
	return res.json({okay:false})
})

router.get("/verify-token/:token",async (req,res)=>{
	const {is_okay} = await verify_token_util(req.params.token)
	return res.json({okay:is_okay})
})

router.post("/change-password/",login_required,async (req,res)=>{
	const changed = await change_password_util(req.user,req.body,false)
	return res.json({okay:changed})
})

router.post("/verify",login_required,async (req,res)=>{
	res.json({okay:true})
})


module.exports = router;