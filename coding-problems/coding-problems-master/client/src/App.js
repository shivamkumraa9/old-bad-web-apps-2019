import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import QuestionList from './components/QuestionList'
import Question from './components/Question'
import Success from './components/Success'
import Cancel from './components/Cancel'


import LoginContext from './contexts/contexts'

function App() {
  const [loggedin,setloggedin] = React.useState(localStorage.getItem('token') ? true : false)
  return (
  		<LoginContext.Provider value={{loggedin,setloggedin}}>
    	<BrowserRouter>
    	<Header />
    	<Route path="/" exact component={Home} />
    	<Route path="/profile" component={Profile} />
    	<Route path="/login" component={Login} />
    	<Route path="/register" component={Register} />
      <Route path="/questions" component={QuestionList} />
      <Route path="/question/:id" component={Question} />
      <Route path="/logout" component={Logout} />
      <Route path="/success" component={Success} />
      <Route path="/cancel" component={Cancel} />
    	</BrowserRouter>
    	</LoginContext.Provider>
  );
}

export default App;
