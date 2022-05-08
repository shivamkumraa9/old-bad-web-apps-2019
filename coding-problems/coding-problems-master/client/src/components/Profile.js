import React from 'react';
import { Redirect } from "react-router-dom";
import Axios from 'axios';

import LoginContext from '../contexts/contexts'

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51GzkYJAkCUXrZtDnOCzWLJB5vHezqcNLrZMy4ctkVrF72uChi6FkmjiN0eXTfUgWG4Mx4x8GIpTiqt1Rsbzqm4Kc00bKGdKiSK');


const Profile = () => {
	const {loggedin,setloggedin} = React.useContext(LoginContext);

	const [loading,setloading] = React.useState(false);

	const [data,setdata] = React.useState({});


	let isCancelled = false;

	React.useEffect(() => {
		if(loggedin){
			Axios.post("/api/auth/profile/",{token:localStorage.getItem('token')})
			.then((response)=>{
				if(!isCancelled){
					setloading(response.data)
				}
			})
			.catch((err)=>{
			})
		}

    return () => {
      isCancelled = true;
    };

	},[]);

	if(!loggedin){
		return(<Redirect to="/login"/>)
	}

	const subscribe = (event)=>{
		Axios.post("/api/subscriptions/create/",{token:localStorage.getItem('token')})
		.then(async(response)=>{
			if(!isCancelled){
				if(response.data.okay){
				    const stripe = await stripePromise;
				    const { error } = await stripe.redirectToCheckout({
				      sessionId:response.data.id
				    });
				}
			}
		})
		.catch((err)=>{
		})

	}

	const cancel = (event)=>{
		Axios.post("/api/subscriptions/cancel/",{token:localStorage.getItem('token')})
		.then((response)=>{
			if(!isCancelled){
				setloading({...loading,is_cancel:true})
			}
		})
		.catch((err)=>{
		})
	}

	const resume = (event)=>{
		Axios.post("/api/subscriptions/resume/",{token:localStorage.getItem('token')})
		.then((response)=>{
			if(!isCancelled){
				setloading({...loading,is_cancel:false})
			}
		})
		.catch((err)=>{
		})
	}


	return(
		<div className="container text-center mt-5">
		{
			!loading 
			?
			<div className="spinner-border" role="status">
			  <span className="sr-only">Loading...</span>
			</div>
			:
			<div className="row">
				<div className="col-md-4">
				</div>
				<div className="col-md-4">
				{
					loading.is_active && loading.is_cancel
					?
						<div className="alert alert-danger" role="alert">
						  Subscription will end on next billing date
						</div>
					:
					""
				}
				  <div className="card p-4 shadow" style={{border:"none"}}>
					<h2>Welcome {loading.username}!</h2>
					{
						loading.is_active
						?
							loading.is_cancel
							?
							<>
							<button type="button" onClick={resume} className="btn btn-primary">Resume Subscription</button>
							
							</>
							:
							<button type="button" onClick={cancel}  className="btn btn-danger">Cancel Subscription</button>	
						:
						<button type="button" onClick={subscribe} className="btn btn-success">Subscribe for 8$</button>
					}					
				  </div>
				</div>
				<div className="col-md-4">
				</div>

			</div>
		}
		</div>
	)
}

export default Profile;