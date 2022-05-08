const jwt = require('jsonwebtoken');
const User = require('../models/user')


module.exports = async (req,res,next) =>{
	const token = req.body.token;
	if (token){
		try{
			const u = jwt.verify(token,process.env.TOKEN)
			let user = await User.findOne({email:u.email})
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