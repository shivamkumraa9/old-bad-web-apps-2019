import React from 'react';

import LoginContext from '../contexts/contexts'


const Logout = () => {
	const {loggedin,setloggedin} = React.useContext(LoginContext);
	React.useEffect(()=>{
		setloggedin(false)
		localStorage.setItem('token','');
	},[])
	return (
		<div className="container mt-3 text-center">

		<div className="alert alert-danger" role="alert">
		  You Have Been Logged Out
		</div>
		</div>
	)
}

export default Logout;