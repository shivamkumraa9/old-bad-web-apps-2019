import React from 'react'
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom'
import LoginContext from '../contexts/contexts'


const Question = (props) =>{
	const {loggedin,setloggedin} = React.useContext(LoginContext);
	const [loading,setloading] = React.useState({load:true,question:false});
	React.useEffect(() => {
		if(loggedin){
			Axios.post(`/api/questions/question/${props.match.params.id}`,{token:localStorage.getItem('token')})
			.then((response)=>{
				if(!isCancelled){
					setloading({load:false,question:response.data})
				}
			})
			.catch((err)=>{
			})
		}

    return () => {
      isCancelled = true;
    };

	},[]);


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


			<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog modal-lg">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Solution</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
            <pre className="language-python"><code className="language-python">{loading.question.answer}</code></pre>  
			      </div>
			    </div>
			  </div>
			</div>

			  <div className="row justify-content-center">
			    <div className="col-md-8">
					<div className="card shadow" style={{ border:"none" }}>
					  <div className="card-body">
					    <h3 className="mb-3">{loading.question.name}</h3>
					    <p className="card-text">
					    	{loading.question.question}
					    </p>
					    
						{
							loading.question.answer
							?
							<button className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal">Reveal Solution</button>
							:
							<button disabled className="btn btn-outline-danger">Upgrade To See Answer</button>
						}

					  </div>
					</div>
			    </div>
			  </div>
			
			<p></p>
			</>
		}
		</div>
	)}

export default Question;