import React from 'react';
import Axios from 'axios'
import { Redirect } from "react-router-dom";

import LoginContext from '../contexts/contexts'


const Register = () => {
	const {loggedin,setloggedin} = React.useContext(LoginContext);

	const [state,setState] = React.useState({
		username:'',
		email:'',
		password1 : '',
		password2 : '',
		emailError: false,
		password1Error:false,
		emailmsg:'Email Already Exists',
		password1msg:'Password Did Not Match',
	})
	const [isloading,setisloading] = React.useState(false)
	const [redirect,setredirect] = React.useState(false)

	const handleChange  = (event)=> {
	    setState({...state,[event.target.name]: event.target.value,[event.target.name+"Error"]: false});
	}
	const handleSubmit = async (event)=> {
		event.preventDefault();
		if(state.password1.length > 5){
			if(state.password1 === state.password2){
				setisloading(true)
				Axios.post("/api/auth/register",{username:state.username,email:state.email,password:state.password1})
				.then((response)=>{
					if(response.data.okay){
						setredirect(true)
					}else{
					    setState({...state,emailError: true});
					    setisloading(false)
					}
				})
				.catch((err)=>{
					setisloading(false)
				})
				
			}else{
			setState({...state,password1Error:true,password2Error:true,password1msg:"Password Did Not Match"});
			}
		}else{
			setState({...state,password1Error:true,password2Error:true,password1msg:"Length should be atleast 6"});
		}
	}

	if(loggedin){
		return(
			<Redirect to="/profile" />
		)
	}

	if(redirect){
		return(
			<Redirect to="/login" />
		)
	}else{
	return(
		<div className="container mt-5">
		<div className="row">
		<div className="col-md-3">
		</div>
		<div className="col-md-6">
		<div className="card p-4 shadow" style={{border:"none"}}>
		<h1 className="text-center">Register Here</h1>
		<form onSubmit={handleSubmit}>
		  <div className="form-group">
		    <label htmlFor="exampleInputName1">Full Name</label>
		    <input name="username" type="text" onChange={handleChange} required className="form-control" id="exampleInputName1" aria-describedby="emailHelp" />
		  </div>		
		  <div className="form-group">
		    <label htmlFor="exampleInputEmail1">Email address</label>
		    <input name="email" type="email" onChange={handleChange} required className={state.emailError ? "form-control is-invalid" : "form-control"} id="exampleInputEmail1" aria-describedby="emailHelp" />
		      <div id="validationServer03Feedback" className="invalid-feedback">
		        {state.emailmsg}
		      </div>   
		  </div>	
		  <div className="form-group">
		    <label htmlFor="exampleInputPass1">Password</label>
		    <input name="password1" type="password"  onChange={handleChange} required className={state.password1Error ? "form-control is-invalid" : "form-control"} id="exampleInputPass1" aria-describedby="emailHelp" />
		      <div id="validationServer03Feedback" className="invalid-feedback">
		        {state.password1msg}
		      </div>
		  </div>
		  <div className="form-group">
		    <label htmlFor="exampleInputPass2">Confirm Password</label>
		    <input name="password2" type="password"  onChange={handleChange} required className={state.password1Error ? "form-control is-invalid" : "form-control"} id="exampleInputPass2" aria-describedby="emailHelp" />
		      <div id="validationServer03Feedback" className="invalid-feedback">
		        {state.password1msg}
		      </div>
		  </div>
		  {
		  	isloading 
		  		?
			   	<div className="spinner-border" role="status">
				  <span className="sr-only">Loading...</span>
				</div> 
		  		:
		  		<button type="submit" className="btn btn-primary">Submit</button>
		  }
  		</form>
  		</div>
		</div>
		<div className="col-md-3">
		</div>
		</div>
  		</div> 
	)
	}
}

export default Register;
