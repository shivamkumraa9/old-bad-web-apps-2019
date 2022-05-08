import React,{useState} from 'react';
import { Redirect,useParams } from "react-router-dom";
import axios from 'axios';

const PasswordResetPerform = (props)=>{
  const [isloading,setIsloading] = useState(false)
  const [iserror,setIserror] = useState(false)
  const [errmsg,seterrmsg] = useState('Passwords not matched')
  const [data,setData] = useState({password1:'',password2:''})
  const [redirect,setredirect] = useState(false)
  const [invalid,setinvalid] = useState(false)

  const ID = useParams().id

  const onSubmit = (event)=>{
    event.preventDefault();
    if(data.password1.length < 6){
      setIserror(true)
      seterrmsg("Password length should be atleat 6")
      setIsloading(false)
    }else if(data.password1 !== data.password2){
      setIserror(true)
      seterrmsg("Passwords not matched")
      setIsloading(false)
    }else{
      setIsloading(true)
      setIserror(false)
      axios.post(process.env.REACT_APP_API_URL+`api/auth/performreset-password/${ID}`,data)
        .then(res => {
          setIsloading(false)
          if(res.data.okay){
            setredirect(true)
          }
          else{
            setinvalid(true)
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
    return(<Redirect to="/password-resetdone"/>)
  }

	return(
  <main id="main" className="mt-5">

    <section id="testimonials" className="testimonials">

<div className="container">

<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h1 className="mt-3 text-center">Set New Password</h1>
    <div className="card-body">
    <form method="post"  onSubmit={onSubmit}>
    {invalid ? <div className="alert alert-danger" role="alert">
  You Don't have permission to perform this action
</div> : ''}
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Password</label>
      {iserror
       ? <input type="password" required={true} onChange={handleChange} name="password1" className="form-control is-invalid" id="exampleInputEmail1" aria-describedby="emailHelp" />
       : <input type="password" required={true} onChange={handleChange} name="password1" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
     }
    <div className="invalid-feedback">
      {errmsg}
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword2">Confirm Password</label>
      {iserror
       ? <input type="password" required={true} onChange={handleChange} name="password2" className="form-control is-invalid" id="exampleInputEmail2" aria-describedby="emailHelp" />
       : <input type="password" required={true} onChange={handleChange} name="password2" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
     }
    <div className="invalid-feedback">
      {errmsg}
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

export default PasswordResetPerform;