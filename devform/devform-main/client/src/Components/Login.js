import React,{useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import LoginContext from '../Contexts/LoginContext'
import { Redirect } from "react-router-dom";

const Login = ()=>{
  const [isloading,setIsloading] = useState(false)
  const [iserror,setIserror] = useState(false)
  const [logindata,setloginData] = useState({email:'',password:''})
  const {data,setData} = React.useContext(LoginContext);
  const [redirect,setredirect] = useState(false)

  const onSubmit = (event)=>{
    event.preventDefault();
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+'api/auth/login',logindata)
      .then(res => {
        setIsloading(false)
        if(res.data.okay){
          localStorage.setItem("token",res.data.token);
          setData({loggedin:true,isloading:false})
          setredirect(true)
        }else{
          setIserror(true)
        }
      })    
  }

  const handleChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.value
    setloginData({
      ...logindata,
      [name]: value
    });
  }

  if(redirect){
    return(<Redirect to="/forms"/>)
  }

	return(
  <main id="main" className="mt-5">

    <section id="testimonials" className="testimonials">
<div className="container">

<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h1 className="mt-3 text-center">Login</h1>
    <div className="card-body">
    <form method="post" onSubmit={onSubmit}>
      {iserror
       ? <div className="alert alert-danger" role="alert">Invalid Email/Password</div>
       : ''
     }
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input required={true} onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input required={true} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
  </div>

    <p>Forget Password <Link to="/password-reset/">Reset Here</Link> </p>
    <button className="btn btn-primary btn-block" type="submit" >
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : 'Submit'
     }
    
</button>
    </form>
    </div>
  </div>
 

</div>

</section>

  </main>
	)
}

export default Login;