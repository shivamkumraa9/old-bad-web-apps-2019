import React from 'react';
import Axios from 'axios'
import { Redirect } from "react-router-dom";

import LoginContext from '../contexts/contexts'


const Login = () => {
	const {loggedin,setloggedin} = React.useContext(LoginContext);
	const [state,setState] = React.useState({
		email:'',
		password : '',
		error : false
	})
	const [isloading,setisloading] = React.useState(false)
	const handleChange  = (event)=> {
	    setState({...state,[event.target.name]: event.target.value});
	}
	const handleSubmit = async (event)=> {
		event.preventDefault();
		setisloading(true)
		Axios.post("/api/auth/login",{email:state.email,password:state.password})
		.then((response)=>{
			if(response.data.okay){
				localStorage.setItem('token',response.data.token)
				setloggedin(true)				
			}else{
			    setState({...state,error: true});
			    setisloading(false)
			}
		})
		.catch((err)=>{
			setisloading(false)
		})

	}
	if(loggedin){
		return(
			<Redirect to="/profile" />
		)
	}
	return(
		<div className="container mt-5">
		<div className="row">
		<div className="col-md-3">
		</div>
		<div className="col-md-6">
		<div className="card p-4 shadow" style={{border:"none"}}>
		<h1 className="text-center">Login Here</h1>
		{
			state.error
			?
			<div className="alert alert-danger" role="alert">
			  Invalid Email/Password
			</div>
			:
			''
		}
		<form onSubmit={handleSubmit} className="mt-2">		
		  <div className="form-group">
		    <label htmlFor="exampleInputEmail1">Email address</label>
		    <input name="email" type="email" onChange={handleChange} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />  
		  </div>	
		  <div className="form-group">
		    <label htmlFor="exampleInputPass1">Password</label>
		    <input name="password" type="password"  onChange={handleChange} required className="form-control" id="exampleInputPass1" aria-describedby="emailHelp" />
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

export default Login;