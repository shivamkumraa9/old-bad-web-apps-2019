import React from 'react'
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom'
import LoginContext from '../contexts/contexts'


const QuestionList = () =>{
	const {loggedin,setloggedin} = React.useContext(LoginContext);
	const [loading,setloading] = React.useState({load:true,seemore:2,questions:[]});
	React.useEffect(() => {
		if(loggedin){
			Axios.post("/api/questions/questions/1",{token:localStorage.getItem('token')})
			.then((response)=>{
				if(!isCancelled){
					setloading({load:false,seemore:loading.seemore,questions:response.data.questions})
				}
			})
			.catch((err)=>{
			})
		}

    return () => {
      isCancelled = true;
    };

	},[]);

	const onClick = (event) =>{
		Axios.post(`/api/questions/questions/${loading.seemore}`,{token:localStorage.getItem('token')})
		.then((response)=>{
			if(!isCancelled){
				const ques = response.data.questions
				if(ques.length > 0){
					const prev = loading.questions.concat(ques)
					setloading({load:false,seemore:loading.seemore+1,questions:prev})
				}else{
					setloading({load:false,seemore:0,questions:loading.questions})
				}
				
			}
		})
		.catch((err)=>{
		})
			}

	let isCancelled = false;
	if(!loggedin){
		return(<Redirect to="/login"/>)
	}

	return(
		<div className="container text-center mt-5">
		{
			loading.load
			?
			<div className="spinner-border" role="status">
			  <span className="sr-only">Loading...</span>
			</div>
			:
			<>
			<div className="row justify-content-center">
			<div className="col-md-8">
			<ul className="list-group">
			 {loading.questions.map((element,index)=>{
			 	return (
			 		<div key={index}>
			 			<Link to={`/question/${element.id_}`} style={{textDecoration:"none"}}>
						  <li className="pt-3 pb-3 answer-item list-group-item d-flex justify-content-between align-items-center shadow">
						    <h4>{element.name}</h4>
						    <span className="badge">
						    	<button type="button" className="btn btn-outline-success">Solve Challange</button>

						    </span>
						  </li>
			 			</Link>
			 		</div>
			 	)
			 })}
			 </ul>
			 </div>
			 </div>

			 {
			 	loading.seemore
			 	?
			 	<button type="button" className="btn btn-success mt-3 mb-5" onClick={onClick}>See More</button>
			 	:
			 	<p className="mt-3  mb-5">No More Questions</p>
			 }
			</>
		}
		</div>
	)}

export default QuestionList;