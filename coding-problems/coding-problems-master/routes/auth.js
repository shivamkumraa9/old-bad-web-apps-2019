const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user')
const Question = require('../models/question')

const login_required = require('../extras/login_required')

// Question({name:"Sum of two numbers",question:"Write a python program to add two numbers",answer :"num1 + num2"}).save()

router.post("/register",async (req,res)=>{
	const {username,email,password} = req.body
	if (username && email && password){
		if(password.length >= 6){
			let email_in_db = await User.findOne({email})
			if (email_in_db){
				res.json({okay:false,msg:"Email Already Exists"})
			}else{
				const hash = await bcrypt.hash(password,10)
				if(hash){
					User({username,email,password:hash}).save()
					res.json({okay:true})
				}
			}
			
		}else{
			res.status(400);
			res.json({okay:false,msg:"Password length should be atleast 6"})			
		}	
	}
	else{
		res.status(400);
		res.json({okay:false,msg:"Incomplete Data"})
	}
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
		res.json({okay:false,msg:"Invalid Email/Password"})
	}
	else{
		res.status(400);
		res.json({okay:false,msg:"Incomplete Data"})
	}
})


router.post("/profile",login_required,async (req,res)=>{
	const user = await User.findOne({email:req.user.email})
	res.json({username:user.username,email:user.email,is_active:user.is_active,is_cancel:user.is_cancel})
})

router.post("/admin",login_required,async (req,res)=>{
	const user = await User.findOne({email:req.user.email})
	if (user.is_admin){
		const {name,question,answer} = req.body;
		if(name && question && answer){
			Question({name,question,answer}).save()
			return res.json({okay:true})
		}
	}
	res.status(401)
	res.json({okay:false,msg:"Unauthorised Access"})
})

router.post("/verify",login_required,async (req,res)=>{
	res.json({okay:true})
})


module.exports = router
