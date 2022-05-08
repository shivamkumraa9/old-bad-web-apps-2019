import React from 'react';
import LoginContext from '../Contexts/LoginContext'
import { Redirect,useParams } from "react-router-dom";


const Protected = (props)=>{
	const {data,setData} = React.useContext(LoginContext);
	  let { id } = useParams()
	if(data.loggedin){
		return(
			<props.element id={id ? id : ''} />
		)
	}
	return(<Redirect to="/login"/>)
}

export default Protected;
