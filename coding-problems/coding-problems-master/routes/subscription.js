const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bodyParser = require('body-parser');

const stripe = require('stripe')(process.env.STRIPE);

const login_required = require('../extras/login_required')



router.post("/create",login_required,async(req,res)=>{
	const user = await User.findOne({email:req.user.email})
	if(user.is_active){
		res.status(401)
		res.json({okay:false,msg:"Subscription already active"})
	}else{
		const session = await stripe.checkout.sessions.create({
		  customer_email: req.user.email,
		  payment_method_types: ['card'],
		  line_items: [{
		    price: 'price_1IXpkHAkCUXrZtDnNfrgfovK',
		    quantity: 1,
		  }],
		  mode: 'subscription',
		  success_url: 'https://codingproblem.herokuapp.com/success',
		  cancel_url: 'https://codingproblem.herokuapp.com/cancel',
		});
		res.json({okay:true,id:session.id})
	}
})


router.post("/cancel",login_required,async(req,res)=>{
	const user = await User.findOne({email:req.user.email})
	if(user.is_cancel){
		res.status(401)
		res.json({okay:false,msg:"Subscription already cancelled"})
	}else{
		stripe.subscriptions.update(user.subscription_id, {cancel_at_period_end: true});
		user.is_cancel = true;
		user.save()
		res.json({okay:true})
	}
})


router.post("/resume",login_required,async(req,res)=>{
	const user = await User.findOne({email:req.user.email})
	if(user.is_cancel){
		stripe.subscriptions.update(user.subscription_id, {cancel_at_period_end: false});
		user.is_cancel = false;
		user.save()
		res.json({okay:true})
	}else{
		res.status(401)
		res.json({okay:false,msg:"Subscription already active"})
	}
})



router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {


  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBSECRET);
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  const session = event.data.object;

  if (event.type === 'checkout.session.completed') {
        User.findOne({email:session.customer_email}).then((user)=>{
    	if(user){
    		user.is_active = true;
    		user.is_cancel = false
    		user.customer_id = session.customer;
    		user.subscription_id = session.subscription
    		user.save()
    	}
    })
    .catch((err)=>{console.log(err)})
  }
  else if(event.type === 'customer.subscription.deleted'){
        User.findOne({subscription_id:session.id}).then((user)=>{
    	if(user){
    		user.is_active = false;
    		user.is_cancel = false
    		user.customer_id = '';
    		user.subscription_id = ''
			stripe.customers.del(
			  user.customer_id,
			  function(err, confirmation) {
			  }
			);
    		user.save()
    	}

})}
  res.json({received: true});
});

module.exports = router
