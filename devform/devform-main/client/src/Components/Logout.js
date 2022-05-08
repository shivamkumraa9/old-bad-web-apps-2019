import React from 'react';
import { Redirect } from "react-router-dom";
import LoginContext from '../Contexts/LoginContext'


const Logout = ()=>{
	const {data,setData} = React.useContext(LoginContext);
	setData({...data,loggedin:false})
	localStorage.removeItem("token");
	return(<Redirect to="/login"/>)

}

export default Logout;