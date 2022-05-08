import React,{useEffect} from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './style.css'

import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Contact from './Components/Contact'
import Pricing from './Components/Pricing'
import Api from './Components/Api'
import Register from './Components/Register'
import Login from './Components/Login'
import PasswordReset from './Components/PasswordReset'
import PasswordResetDone from './Components/PasswordResetDone'
import PasswordResetConfirm from './Components/PasswordResetConfirm'
import PasswordResetPerform from './Components/PasswordResetPerform'
import Billing from './Components/Billing'
import Profile from './Components/Profile'
import Form from './Components/Form'
import Forms from './Components/Forms'
import NotFound from './Components/NotFound'
import Logout from './Components/Logout'
import Submission from './Components/Submission'


import LoginContext from './Contexts/LoginContext'
import Protected from './Components/Protected'

function App() {
  const [data,setData] = React.useState({loggedin:false,isloading:true})
  useEffect(()=>{
          const has_token = localStorage.getItem('token') ? true : false
          if(has_token){
            axios.post(process.env.REACT_APP_API_URL+'api/auth/verify',{token:localStorage.getItem('token')})
              .then(res => {
                setData({loggedin:res.data.okay,isloading:false})
              })
              .catch(res =>{
                setData({loggedin:false,isloading:false})
              })
          }else{
            setData({loggedin:false,isloading:false})
          }
  },[])
  if(data.isloading){
    return(
      <main id="main" style={{height:"100vh",position:"relative"}}>
        <div className="spinner-border text-primary" role="status" style={{width:"4rem",height:"4rem",position: "absolute",top:"45%",left:"45%"}}>
          <span className="sr-only">Loading...</span>
      </div>
      </main>
    )
  }
  return (
    <LoginContext.Provider value={{data,setData}}>
      <Router>
          <Header />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/pricing">
              <Pricing />
            </Route>
            <Route path="/api">
              <Api />
            </Route>
            <Route path="/password-reset">
              <PasswordReset />
            </Route>
            <Route path="/password-resetdone">
              <PasswordResetDone />
            </Route>
            <Route path="/password-resetconfirm">
              <PasswordResetConfirm />
            </Route>
            <Route path="/password-resetperform/:id">
              <PasswordResetPerform />
            </Route>
            <Route path="/submission">
              <Submission />
            </Route>
            <Route path="/billing">
              <Protected element={Billing} />
            </Route>
            <Route path="/profile">
              <Protected element={Profile} />
            </Route>
            <Route path="/form/:id">
              <Protected element={Form} />
            </Route>
            <Route path="/forms">
              <Protected element={Forms} />
            </Route>
            <Route path="/logout">
              <Protected element={Logout} />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
