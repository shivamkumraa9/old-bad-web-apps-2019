const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bodyParser = require('body-parser');

const stripe = require('stripe')(process.env.STRIPE);

const login_required = require('../extras/login_required')


router.post("/set-card",login_required,async (req,res)=>{
	if(req.body.number && req.body.month && req.body.year && req.body.cardzip){
		try{
			const paymentMethod = await stripe.paymentMethods.create({
			  type: 'card',
			  card: {number: req.body.number,exp_month: req.body.month,exp_year: req.body.year,cvc: req.body.cardzip,},
			});	
			const paymentMethods = await stripe.paymentMethods.list({customer: req.user.customer_id,type: 'card'})
			if(paymentMethods.data.length > 0){
				const existing_id = paymentMethods.data[0].id
				const paymentMethod = await stripe.paymentMethods.detach(existing_id);
			}
			const attached = await stripe.paymentMethods.attach(
			  paymentMethod.id,
			  {customer: req.user.customer_id}
			);
			const customer = await stripe.customers.update(
			  req.user.customer_id,
			  {invoice_settings:{default_payment_method:paymentMethod.id}});
			req.user.has_card = true
			req.user.save()
			return res.json({okay:true,msg:"Success"})
		}catch(err){return res.json({okay:false,msg:err.raw.message})}
	}
	return res.json({okay:true,msg:"Insufficient Data"})
})

function GetFormattedDate(todayTime) {
    var month = todayTime.getMonth() + 1
    var day = todayTime.getDate()
    var year = todayTime.getFullYear()
    return month + "/" + day + "/" + year;
}

router.post("/subscribe",login_required,async (req,res)=>{
	if(!req.user.has_card){
		return res.json({okay:false,msg:"No Payment method found"})
	}
	let plan; let current;
	if(req.body.plan === 'business'){
		current = 'business'
		plan = 'price_1IbJO2AkCUXrZtDnAoPHLJoh'
	}
	else if(req.body.plan === 'developer'){
		current = 'developer'
		plan = 'price_1IbJNsAkCUXrZtDn76cakUaD'
	}
	else{
		return res.json({okay:false})
	}
	if(req.user.has_subscription){
		if(current !== req.user.current){
			const subscription = await stripe.subscriptions.retrieve(req.user.subscription_id);
			stripe.subscriptions.update(req.user.subscription_id, {
			  cancel_at_period_end: false,
			  proration_behavior: 'always_invoice',
			  items: [{
			    id: subscription.items.data[0].id,
			    price: plan,
			  }]
			})
			req.user.current = current
			req.user.is_cancel = false
			req.user.save()
		return res.json({okay:true})
		}
		return res.json({okay:false})
	}
	const subscription = await stripe.subscriptions.create({
	  customer: req.user.customer_id,
	  items: [
	    {price: plan},
	  ],
	})
	let date = new Date(subscription.current_period_end * 1000)
	req.user.subscription_id = subscription.id
	req.user.has_subscription = true;
	req.user.current = current;
	req.user.date = GetFormattedDate(date)
	req.user.save()
	res.json({okay:true})
})

router.post("/cancel",login_required,async(req,res)=>{
	stripe.subscriptions.update(req.user.subscription_id, {cancel_at_period_end: true});
	req.user.is_cancel = true;
	req.user.save()
	res.json({okay:true})
})


router.post("/resume",login_required,async(req,res)=>{
	stripe.subscriptions.update(req.user.subscription_id, {cancel_at_period_end: false});
	req.user.is_cancel = false;
	req.user.save()
	res.json({okay:true})
})



router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {

  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBSECRET);
  } catch (err) {
    console.log(`Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  const session = event.data.object;

  if(event.type === 'customer.subscription.deleted'){
        User.findOne({subscription_id:session.id}).then((user)=>{
    	if(user){
    		user.has_subscription = false;
    		user.is_cancel = false
    		user.customer_id = '';
    		user.subscription_id = '';
    		user.current='free'
    		user.save()
    	}
})}
  res.json({received: true});
});

module.exports = router
