import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';


const PasswordResetPerform2 = ()=>{
  const [isloading,setIsloading] = useState(false)
  const [iserror,setIserror] = useState(false)
  const [errmsg,seterrmsg] = useState('Passwords not matched')
  const [data,setData] = useState({password1:'',password2:''})
  const [btnmsg,setBtnmsg] = useState('Update Password')

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
      axios.post(process.env.REACT_APP_API_URL+'api/auth/change-password',{token:localStorage.getItem('token'),...data})
        .then(res => {
          setIsloading(false)
          setIserror(false)
          setBtnmsg("Password Updated")
        })
    }
    console.log(data)
  }

  const handleChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.value
    setData({
      ...data,
      [name]: value
    });
    setBtnmsg("Update Password")
  }
  return(
<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h1 className="mt-3 text-center">Set New Password</h1>
    <div className="card-body">
    <form method="post"  onSubmit={onSubmit}>

  <div className="form-group">
    <label>Password</label>
      {iserror
       ? <input type="password" required={true} onChange={handleChange} name="password1" className="form-control is-invalid" />
       : <input type="password" required={true} onChange={handleChange} name="password1" className="form-control"/>
     }
    <div className="invalid-feedback">
      {errmsg}
    </div>
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
      {iserror
       ? <input type="password" required={true} onChange={handleChange} name="password2" className="form-control is-invalid" />
       : <input type="password" required={true} onChange={handleChange} name="password2" className="form-control" />
     }
    <div className="invalid-feedback">
      {errmsg}
    </div>
  </div>

    <button className="btn btn-primary btn-block" type="submit">
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : btnmsg
     }
    </button>
  </form>
    </div>
  </div>
  )
}


const EditInfo = (props)=>{
  const [btnmsg,setBtnmsg] = useState('Update Info')
  const [data,setData] = useState(props.data)

  const onSubmit = (event)=>{
    event.preventDefault();
    const newd = data
    newd.token = localStorage.getItem('token')
    axios.post(process.env.REACT_APP_API_URL+'api/auth/set-info',newd)  
    setBtnmsg("Updated!")
  }

  const handleChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.value
    setData({
      ...data,
      [name]: value
    });
    setBtnmsg("Update Info")
  }
  return(
  <div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
      <h2 className="mt-3 text-center">Edit Info</h2>
      <div className="card-body">
      <form method="post"  onSubmit={onSubmit}>

    <div className="form-group">
      <label>Email address</label>
      <input type="email" defaultValue={props.data.email} disabled={true} className="form-control" />
    </div>
    <div className="form-group">
      <label >Full Name</label>
      <input type="text" defaultValue={props.data.name} required={true} onChange={handleChange} name="name" className="form-control" />
    </div>
    <button className="btn btn-primary btn-block" type="submit">
    {btnmsg}
    </button>
  </form>
      </div>
    </div>
  )
}



const Profile = ()=>{
  const [data,setData] = useState({loading:true,has_card:false,has_subscription:false,info:{},current:'free',is_canceled:false,date:"4 may 2021"})
    
    useEffect(()=>{
      axios.post(process.env.REACT_APP_API_URL+'api/auth/profile',{token:localStorage.getItem('token')})
        .then(res => {
          setData(res.data)
        })  
  },[])

  const cancel = (event)=>{
    axios.post(process.env.REACT_APP_API_URL+'api/subscriptions/cancel',{token:localStorage.getItem('token')})  
    setData({...data,is_canceled:true})
  }
  const resume = (event)=>{
    axios.post(process.env.REACT_APP_API_URL+'api/subscriptions/resume',{token:localStorage.getItem('token')})  
    setData({...data,is_canceled:false})
  }
  if(data.loading){
    return(
      <main id="main" style={{height:"60vh",position:"relative"}}>
        <div className="spinner-border text-primary" role="status" style={{width:"4rem",height:"4rem",position: "absolute",top:"50%",left:"45%"}}>
          <span className="sr-only">Loading...</span>
      </div>
      </main>
    )
  }
	return(
  <main id="main" className="mt-5">
    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2 style={{marginBottom:"5px"}}>Edit Profile</h2>
          <p>Current Plan : {data.current}
          {
            data.has_subscription 
            ?
              data.is_canceled ? `, Cancelling on ${data.date}` : `, Next Billing on ${data.date}` 
            :''
          }
          </p>
          
          <div className="mt-2">
            <p>
            {
              data.is_canceled
              ? 
                <Link to="#"  className="btn btn-info" onClick={resume}>Resume</Link>
              : 
              data.has_subscription ? <Link to="#" className="btn btn-danger" onClick={cancel}>Cancel Sub</Link> : <Link to="/pricing" className="btn btn-success">Upgrade</Link>
            }
               &nbsp;&nbsp;

                <Link to="/billing" className="btn btn-primary">
                  {
                    data.has_card
                    ? "Update card" 
                    : "Add Card"
                  }             
                </Link>

            </p>
            
          </div>
        </div>
        <div className="row content">
          <div className="col-lg-6">
            <EditInfo data={data.info} />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <PasswordResetPerform2 />
          </div>
        </div>
      </div>
    </section>
  </main>
	)
}

export default Profile;