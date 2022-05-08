import React,{useState} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


const Register = ()=>{
  const [isloading,setIsloading] = useState(false)
  const [emailError,setEmailError] = useState(false)
  const [passwordError,setPasswordError] = useState(false)
  const [data,setData] = useState({fullname:'',email:'',password:''})
  const [redirect,setredirect] = useState(false)

  const onSubmit = (event)=>{
    event.preventDefault();
    setIsloading(true)
    if(data.password.length < 6){
      setPasswordError(true)
      setIsloading(false)
    }else{
      setPasswordError(false)
      axios.post(process.env.REACT_APP_API_URL+'api/auth/register',data)
        .then(res => {
          setIsloading(false)
          if(res.data.okay){
            setredirect(true)
          }else{
            setEmailError(true)
          }
        })   
    }
  }

  const handleChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.value
    setData({
      ...data,
      [name]: value
    });
  }

  if(redirect){
    return(<Redirect to="/login"/>)
  }

	return(
  <main id="main" className="mt-5">
    <section id="testimonials" className="testimonials">

<div className="container">

<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h1 className="mt-3 text-center">Register</h1>
    <div className="card-body">
    <form method="post" onSubmit={onSubmit} className="needs-validation">

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Full Name</label>
    <input name="fullname" required={true} onChange={handleChange}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail2">Email address</label>
      {emailError
       ? <input name="email" required={true} onChange={handleChange}  type="email" className="form-control is-invalid" id="exampleInputEmail2" aria-describedby="emailHelp" />
       : <input name="email" required={true} onChange={handleChange}  type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
     }
    <div className="invalid-feedback">
      Email Already Exists!
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
      {passwordError
       ? <input name="password" required={true} onChange={handleChange} type="password" className="form-control is-invalid" id="exampleInputPassword1" />
       : <input name="password" required={true} onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" />
     }
      <div className="invalid-feedback">
        Password length should be atleat 6
      </div>
  </div>
    <button className="btn btn-primary btn-block" type="submit">
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

export default Register;