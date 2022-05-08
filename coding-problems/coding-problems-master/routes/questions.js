const express = require('express');
const router = express.Router();

const Question = require('../models/question')
const User = require('../models/user')

const login_required = require('../extras/login_required')

router.post("/questions/:number",login_required,async(req,res)=>{
	const page = parseInt(req.params.number)
	if(page){
		const lower = (page*10)-10
		const upper = (page*10)
		const ques = await Question.find({}).sort({'created': '-1'});
		const sliced = ques.slice(lower,upper)
		const result = []
		sliced.forEach((item,index)=>{
			result.push({id_:item._id,name:item.name})
		})
		res.json({questions:result})
	}else{
		res.status(404)
		res.json({msg:"404 Not Found"})
	}
})

router.post("/question/:id",login_required,async(req,res)=>{
	const user = await User.findOne({email:req.user.email})
	const id = req.params.id
	const ques = Question.findById(id)
	.then((ques)=>{
		if(ques){
			if (user.is_active){
				res.json({name:ques.name,question:ques.question,answer:ques.answer})
			}else{
				res.json({name:ques.name,question:ques.question,answer:false})
			}
			
		}
	})
	.catch((err)=>{
		res.status(404)
	    res.json({msg:"404 Not Found"})
	})
})

module.exports = router
