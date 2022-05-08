const jwt = require('jsonwebtoken');


module.exports = (req,res,next) =>{
	const token = req.body.token;
	if (token){
		const user = jwt.verify(token,process.env.TOKEN)
		if(user){
				req.user = user
				next()
				return
		}
	}
	res.status(401)
	res.json({okay:false,msg:"Unauthorised Access"})
}