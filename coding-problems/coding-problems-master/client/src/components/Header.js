import React from 'react';
import {Link} from 'react-router-dom'

import LoginContext from '../contexts/contexts'


const Header = () => {
	const {loggedin,setloggedin} = React.useContext(LoginContext);

	return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		  <div className="container">
			  <Link to="/" className="navbar-brand">Hackercode</Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav ml-auto">
			      <li className="nav-item">
			      	<Link to="/" className="nav-link">Home</Link>
			      </li>			      
			      {
			      	loggedin
			      	?
			      	 <>
				      <li className="nav-item">
				      	<Link to="/profile" className="nav-link">Profile</Link>
				      </li>
				      <li className="nav-item">
				      	<Link to="/questions" className="nav-link">Questions</Link>
				      </li>

				      <li className="nav-item">
				      	<Link to="/logout" className="nav-link">Logout</Link>
				      </li>
				      </>
				    :
				      <>
				      <li className="nav-item">
				      	<Link to="/register" className="nav-link">Register</Link>
				      </li>
				      <li className="nav-item">
				      	<Link to="/login" className="nav-link">Login</Link>
				      </li>
				      </>
			      }
			    </ul>
			  </div>
		  </div>
		</nav>
	)
}

export default Header