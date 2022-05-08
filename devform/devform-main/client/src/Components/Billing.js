import React,{useState,useEffect} from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';


const Billing = ()=>{
  const [isloading,setIsloading] = useState(false)
  const [data,setData] = useState({})
  const [iserror,setIserror] = useState(false)
  const [priceData,setPriceData] = useState({isloading:true,has_card:false,errmsg:''})
  useEffect(()=>{
      axios.post(process.env.REACT_APP_API_URL+'api/auth/profile',{token:localStorage.getItem('token')})
        .then(res => {
         setPriceData({isloading:false,redirect:false,has_card:res.data.has_card,errmsg:''})
        })  
      },[])

  const onSubmit = (event)=>{
    event.preventDefault();
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+'api/subscriptions/set-card',{token:localStorage.getItem('token'),...data})
      .then(res => {
        setIsloading(false)
        if(res.data.okay){
          setPriceData({...priceData,redirect:true})
        }else{
          setIserror(true)
          setPriceData({...priceData,errmsg:res.data.msg})
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
  if(priceData.isloading){
    return(
      <main id="main" style={{height:"60vh",position:"relative"}}>
        <div className="spinner-border text-primary" role="status" style={{width:"4rem",height:"4rem",position: "absolute",top:"50%",left:"45%"}}>
          <span className="sr-only">Loading...</span>
      </div>
      </main>
    )
  }
  if(priceData.redirect){
    return(<Redirect to="/pricing"/>)
  }

	return(
  <main id="main" className="mt-5">

    <section id="pricing" className="pricing">
      <div className="container">
<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h1 className="mt-3 text-center">{priceData.has_card ? 'Update' : 'Add'} Card</h1>
    <p className="text-danger text-center">{priceData.has_card ? 'Card already added' : ''}</p>
    <div className="card-body">
    <form method="post" onSubmit={onSubmit}>
                {iserror
                 ? <div className="alert alert-danger" role="alert">{priceData.errmsg}</div>
                 : ''
               }
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" required={true} onChange={handleChange} maxLength={19}  name="number" className="form-control"/>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Exp Month</label>
                <input type="text" required={true} onChange={handleChange}  maxLength={2}  name="month"  className="form-control" placeholder="MM" />
              </div>
              <div className="form-group col-md-4">
                <label>Exp Year</label>
                <input type="text" required={true} onChange={handleChange}  maxLength={2}  name="year"  className="form-control" placeholder="YY" />
              </div>
              <div className="form-group col-md-4">
                <label>Code</label>
                <input type="text" required={true} onChange={handleChange}  maxLength={5} name="cardzip"  className="form-control" />
              </div>
            </div>
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

export default Billing;