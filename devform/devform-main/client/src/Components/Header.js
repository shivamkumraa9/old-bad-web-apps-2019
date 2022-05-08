import React from 'react';
import {Link} from "react-router-dom";
import LoginContext from '../Contexts/LoginContext'

const Header = () =>{
	const {data,setData} = React.useContext(LoginContext);

	return(
		<header>
			<nav id="header" className="navbar navbar-expand-lg navbar-light fixed-top">
			  <div className="container">
			    
			  <h1 className="logo mr-auto"><Link to="/">DevForms</Link></h1>
			  <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="navbar-collapse collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav ml-auto pt-1">
			      <li className="nav-item ml-2 apna">
			        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
			      </li>
			      <li className="nav-item ml-2 apna">
			        <Link className="nav-link" to="/pricing">Pricing</Link>
			      </li>
			      <li className="nav-item ml-2 apna">
			        <Link className="nav-link" to="/api">API</Link>
			      </li>
			      {
			      	data.loggedin
			      	?
			      <>
			      <li className="nav-item ml-2 apna">
			        <Link className="nav-link" to="/profile">Profile</Link>
			      </li>
			      <li className="nav-item ml-2 apna">
			        <Link className="nav-link" to="/logout">Logout</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/forms" className="get-started-btn scrollto">Dashboard</Link>
			      </li>
			      </>
			      :
			      <>
			      <li className="nav-item ml-2 apna">
			        <Link className="nav-link" to="/login">Login</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/register" className="get-started-btn scrollto">Register</Link>
			      </li>
			      </>
			      }

			    </ul>
			  </div>

			  </div>
			</nav>
		</header>
	)
}

export default Header;