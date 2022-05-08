const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user')
const Form = require('../models/form')

const login_required = require('../extras/login_required')

router.post("/get-forms",login_required,async (req,res)=>{
	data = await Form.find({user:req.user._id},['id_', 'name'])
	res.json({api_key:req.user.api_key,use_email:req.user.current !== 'free',data:data})
})

router.post("/change-apikeys",login_required,async (req,res)=>{
	const key = await bcrypt.hash(Math.random().toString(36),16)
	req.user.api_key = key
	req.user.save()
	res.json({okay:true,key:key})
})

const Get_body = (req)=>{
	let data = {name:req.body.name,success:req.body.success,user:req.user.id}
	if(req.user.current !== 'free'){
		data.isemail = req.body.isemail
		data.email = req.body.email
	}
	if(req.body.whitelist){
		data.whitelist = req.body.whitelist.split(",").map((element)=>{return element.trim()});
	}
	return data
}

router.post("/create-form",login_required,async (req,res)=>{
	data = Get_body(req)
	try{
		f = Form(data)
		await f.save()
		req.user.forms.push(f)
		await req.user.save()
		return res.json({okay:true,_id:f._id,name:f.name})
	}catch(err){console.log(err);return res.json({okay:false,msg:'Some Error occured'})}
})

router.post("/update-form/:id",login_required,async (req,res)=>{
	data = Get_body(req)
	try{
		f = await Form.findOneAndUpdate({_id:req.params.id,user:req.user._id},{$unset:{name:'',success:'',isemail:'',whitelist:'',email:''}})
		if(f){
			f = await Form.findOneAndUpdate({_id:req.params.id,user:req.user._id},data)
			return res.json({okay:true})
		}
	}catch(err){console.log(err)}
	res.json({okay:false,msg:'Some Error occured'})
})

router.post("/delete-form/:id",login_required,async (req,res)=>{
	f = await Form.findOneAndDelete({_id:req.params.id,user:req.user._id})
	try{await req.user.updateOne({$pull:{forms:req.params.id}})}catch(err){console.log(err)}
	res.json({okay:true})
})

router.post("/get-form/:id",login_required,async (req,res)=>{
	try{
		f = await Form.findOne({_id:req.params.id,user:req.user._id})
		let data = []
		f.submissions.forEach((item,index)=>{
			data.push({_id:item._id,actual:JSON.parse(item.data),submitted:item.time})
		})
		let form_data = {name:f.name,success:f.success,isemail:f.isemail,email:f.email}
		form_data.whitelist = f.whitelist.join(", ")
		if(f){
			return res.json({okay:true,api_key:req.user.api_key,use_email:req.user.current !== 'free',data:data,form_data:form_data})
		}
	}catch(err){}
	res.json({okay:false,msg:'Some Error occured'})
})

const check_origins = (f,origin)=>{
	let good = false;
	f.whitelist.forEach((item)=>{
		if(item === origin){
			good = true;
			return
		}
	})
	return good
}

const send_email = (email,id,exhausted)=>{
	const transporter = nodemailer.createTransport({service: 'gmail',auth: {user: process.env.EMAIL,pass: process.env.PASSWORD}});
	const mailOptions = {
	  from: process.env.EMAIL,
	  to: email,
	  subject: exhausted ? 'Limit exhausted' : `New Submission`,
	  text: exhausted ? 'Your plan limits has exhausted please upgrade' : `You recieved a new submission https://devform.herokuapp.com/form/${id}`
	};
	transporter.sendMail(mailOptions, function(error, info){})
}

const has_permission = (user) =>{
	if(user.current === 'free' && user.total >= 100){
		return false
	}
	else if(user.current === 'developer' && user.total >= 2000){
		return false
	}
	return true
}

router.post("/submit/:formid",async (req,res)=>{
	if(req.body){
		try{
			f = await Form.findOne({_id:req.params.formid})
			if(f){
				let is_good = true
				if(f.whitelist && f.whitelist.length > 0){
					let origin = req.get('origin')
					if(origin){
						is_good = check_origins(f,origin)
					}else{
						is_good = false
					}
				}
				const user = await User.findOne({_id:f.user})
				const has_p = has_permission(user)
				if(!has_p){
					send_email(user.email ,f._id,true)
				}
				if(is_good && has_p){
					await f.updateOne({$push:{submissions:{data:JSON.stringify(req.body)}}})
					user.total = user.total + 1
					await user.save()
					if(f.isemail){
						if(user.current !== 'free'){
							let e = f.email || user.email
							send_email(e ,f._id)
						}
					}
				}
				return res.redirect(f.success || 'https://devform.herokuapp.com/submission')
			}
		}catch(err){console.log(err)}
	}
	return res.json({okay:false,msg:'No data found!'})
})

router.post("/delete-submission/:formid/:subid",login_required,async (req,res)=>{
	try{
		f = await Form.findOne({_id:req.params.formid,user:req.user._id})
		if(f){
			await f.updateOne({$pull:{submissions:{_id:req.params.subid}}})
			return res.json({okay:true})
		}
	}catch(err){}
	
	return res.json({okay:false,msg:'No data found!'})
})


router.post("/load-more/:formid",login_required,async (req,res)=>{
	try{
		f = await Form.findOne({_id:req.params.formid,user:req.user._id})
		if(f){
			let limit = parseInt(req.query.limit)
			let page = parseInt(req.query.page)
				let data = []
				f.submissions.slice(page*limit,(page*limit)+limit).forEach((item,index)=>{
					data.push({_id:item._id,actual:JSON.parse(item.data),submitted:item.time})
				})
				return res.json({okay:true,data:data})	
		}
	}catch(err){console.log(err)}
	res.json({okay:false,msg:'Some Error occured'})
})

router.post("/download/:id",login_required,async (req,res)=>{
	try{
		f = await Form.findOne({_id:req.params.id,user:req.user._id})
		if(f){
			let data = []
			f.submissions.forEach((item,index)=>{
				data.push({id:item._id,submission:JSON.parse(item.data),time:item.time})
			})
			res.setHeader('Content-type', "application/octet-stream");
			res.setHeader('Content-disposition', 'attachment;filename=file.json');
			return res.send(JSON.stringify(data, null, 4))
		}
	}catch(err){console.log(err)}
	res.json({okay:false,msg:'Some Error occured'})
})

const apiMiddleware = async (req,res,next)=>{
	const token = req.body.token;
	if (token){
		try{
			let user = await User.findOne({api_key:token})
			if(user){
					req.user = user
					next()
					return
			}
		}catch(err){}
	}
	res.status(401)
	res.json({okay:false,msg:"Unauthorised Access"})
}

router.get("/v1",apiMiddleware,async (req,res)=>{
	let data = await Form.find({user:req.user._id})
	data = data.map((element)=>{return {id:element._id,name:element.name,submissions:element.submissions.length}})
	res.json({data:data})
})

router.get("/v1/:id",apiMiddleware,async (req,res)=>{
	try{
		f = await Form.findOne({_id:req.params.id,user:req.user._id})
		if(f){
			return res.json({name:f.name,id:f._id,success:f.success,whitelist:f.whitelist,submissions:f.submissions.length})	
		}
	}catch(err){console.log(err)}
	res.json({okay:false,msg:'Some Error occured'})
})

router.get("/v1/:id/submissions",apiMiddleware,async (req,res)=>{
	try{
		f = await Form.findOne({_id:req.params.id,user:req.user._id})
		if(f){
			let limit = parseInt(req.query.limit)
			let page = parseInt(req.query.page)
			if(limit && page){}
			else if(limit){page = 0;limit = limit;}
			else if(page){page = page;limit = 10;}
			else{page=0;limit=f.submissions.length}
			let data = []
			f.submissions.slice(page*limit,(page*limit)+limit).forEach((item,index)=>{
				data.push({id:item._id,data:JSON.parse(item.data),time:item.time})
			})
			return res.json({data:data})	
		}
	}catch(err){console.log(err)}
	res.json({okay:false,msg:'Some Error occured'})
})


module.exports = router