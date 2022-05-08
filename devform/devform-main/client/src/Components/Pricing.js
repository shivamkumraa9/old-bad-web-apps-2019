import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import LoginContext from '../Contexts/LoginContext'
import { Redirect } from "react-router-dom";
import axios from 'axios';

const Pricing = ()=>{
  const {data,setData} = React.useContext(LoginContext);
  const [priceData,setPriceData] = useState({isloading:true,current:"free",has_card:false,redirect:false})
    useEffect(()=>{
      if(data.loggedin){
        axios.post(process.env.REACT_APP_API_URL+'api/auth/profile',{token:localStorage.getItem('token')})
          .then(res => {
            setPriceData({...priceData,isloading:false,has_card:res.data.has_card,current:res.data.current})
          })             
      }
  },[])

  const onClick = (membership)=>{
    if(!priceData.has_card){
        setPriceData({...priceData,redirect:true})
    }else{
      axios.post(process.env.REACT_APP_API_URL+'api/subscriptions/subscribe',{token:localStorage.getItem('token'),plan:membership})
      .then(res=>{
        if(res.data.okay){
          setPriceData({...priceData,redirect:true})
        }
        else{console.log("test")}
      })
    }
  }

  if(priceData.redirect){
    if(!priceData.has_card){
        return(<Redirect to="/billing"/>)
    }else{
      return(<Redirect to="/profile"/>)
    }
  }

  if(data.loggedin){
  if(priceData.isloading){
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
          <h2>Pricing</h2>
          <p>Plans are in Indian Rupees (INR ₹).</p>
        </div>

        <div className="row">

          <div className="col-lg-4 col-md-6" data-aos="zoom-im" data-aos-delay="100">
            <div className="box">
              <h3>Free</h3>
              <h4><sup>₹</sup>0<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>100 Form Submission</li>
                <li>API Access</li>
                <li className="na">Email Notification</li>
              </ul>
              <div className="btn-wrap">

               {
                  priceData.current === 'free'
                  ? <Link to="#" className="btn-buy">Current</Link>
                  : <Link to="#" className="btn-buy">Buy Now</Link>
                }
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box featured">
              <h3>Developer</h3>
              <h4><sup>₹</sup>249<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>2000 Form Submission</li>
                <li>API Access</li>
                <li>Email Notification</li>
              </ul>
              <div className="btn-wrap">
               {
                  priceData.current === 'developer'
                  ? <Link to="#" className="btn-buy">Current</Link>
                  : <Link to="#" onClick={()=>{onClick("developer")}} className="btn-buy">Buy Now</Link>
                }
             </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box">
              <h3>Business</h3>
              <h4><sup>₹</sup>999<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>Unlimited Form Submissions</li>
                <li>API Access</li>
                <li>Email Notification</li>
              </ul>
              <div className="btn-wrap">
                
                {
                  priceData.current === 'business'
                  ? <Link to="#" className="btn-buy">Current</Link>
                  : <Link to="#" onClick={()=>{onClick("business")}} className="btn-buy">Buy Now</Link>
                }

                
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

  </main>
  )
  }
	return(
  <main id="main" className="mt-5">

    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Pricing</h2>
          <p>Plans are in Indian Rupees (INR ₹).</p>
        </div>

        <div className="row">

          <div className="col-lg-4 col-md-6" data-aos="zoom-im" data-aos-delay="100">
            <div className="box">
              <h3>Free</h3>
              <h4><sup>₹</sup>0<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>100 Form Submission</li>
                <li>API Access</li>
                <li className="na">Email Notification</li>
              </ul>
              <div className="btn-wrap">
                <Link to="/login" className="btn-buy">Buy Now</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box featured">
              <h3>Developer</h3>
              <h4><sup>₹</sup>249<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>2000 Form Submission</li>
                <li>API Access</li>
                <li>Email Notification</li>
              </ul>
              <div className="btn-wrap">
                <Link to="/login" className="btn-buy">Buy Now</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box">
              <h3>Business</h3>
              <h4><sup>₹</sup>999<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>Unlimited Form Submissions</li>
                <li>API Access</li>
                <li>Email Notification</li>
              </ul>
              <div className="btn-wrap">
                <Link to="/login" className="btn-buy">Buy Now</Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

  </main>
	)
}

export default Pricing;