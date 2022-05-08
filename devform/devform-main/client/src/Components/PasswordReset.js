import React,{useState} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


const PasswordReset = ()=>{
  const [isloading,setIsloading] = useState(false)
  const [data,setData] = useState({email:''})
  const [redirect,setredirect] = useState(false)

  const onSubmit = (event)=>{
    event.preventDefault();
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+'api/auth/reset-password',data)
      .then(res => {
        setIsloading(false)
        if(res.data.okay){
          setredirect(true)
        }
      })    
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
    return(<Redirect to="/password-resetconfirm"/>)
  }
	return(
  <main id="main" className="mt-5">

    <section id="testimonials" className="testimonials">

<div className="container">

<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h1 className="mt-3 text-center">Password Reset</h1>
    <div className="card-body">
    <form method="post" onSubmit={onSubmit}>

  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input name="email" type="email" required={true} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
    <button className="btn btn-primary btn-block" type="submit" >
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : 'Submit'
     }
    
</button>    </form>
    </div>
  </div>
 

</div>

</section>

  </main>
	)
}

export default PasswordReset;