import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const Popup = (props)=>{
  const [isloading,setIsloading] = useState(false)
  const [iserror,setIserror] = useState(false)
  const [data,setData] = useState({})

  const onSubmit = (event)=>{
    event.preventDefault();
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+'api/forms/create-form',{token:localStorage.getItem('token'),...data})
    .then(res => {
      if(res.data.okay){
        const arr = props.parentdata.data
        arr.push({_id:res.data._id,name:data.name})
        props.setParentdata({...props.parentdata,data:arr})
        document.querySelector("#modalshut").click()
        event.target.reset()
      }else{
        setIserror(true)
      }
      setData({...data,api_key:res.data.key})
    })
  }

  const handleChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setData({
      ...data,
      [name]: value
    });
  }

  return(
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Create New Form</h5>
        <button id="modalshut" type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
<form onSubmit={onSubmit}>
      {iserror
       ? <div className="alert alert-danger" role="alert">Some error occured</div>
       : ''
     }
  <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" name="name" required={true} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label>Success Redirect</label>
    <input type="text" className="form-control" name="success" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label>WhiteList Domains</label>
    <textarea name="whitelist" className="form-control" onChange={handleChange} placeholder="www.test1.com, www.test2.com" rows="3"></textarea>
  </div>
  {
    props.parentdata.use_email
    ?
  <div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"  name="isemail" onChange={handleChange} />
    <label className="form-check-label" htmlFor="exampleCheck1">Get Email Notification</label>
  </div>
  <div className="form-group">
    <label>Email to recieve notification</label>
    <input type="text" className="form-control" name="email" onChange={handleChange}  />
  </div>
  </div>
  :
  <div className="alert alert-warning" role="alert">
    Upgrade to use this email notification option
  </div>
  }

    <button className="btn btn-primary btn-block" type="submit" >
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : 'Submit'
     }
    
</button>
</form>
      </div>
    </div>
  </div>
</div>
    )
}

const Popup2 = (props)=>{
  const [isloading,setIsloading] = useState(false)

  const refreshkeys = (event)=>{
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+'api/forms/change-apikeys',{token:localStorage.getItem('token')})
    .then(res => {
      setIsloading(false)
      props.setData({...props.data,api_key:res.data.key})
    })
  }

  return(
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel1">Your Api Keys</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
    <div className="form-group">
      <label>Api Key</label>
      <input disabled={true} value={props.data.api_key} type="text" className="form-control"/>
      <button onClick={refreshkeys} className="btn btn-dark mt-1">
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : 'Refresh keys'
      }
      </button>
    </div>
      </div>
    </div>
  </div>
</div> 
    )
}

const Forms = ()=>{
  const [data,setData] = useState({loading:true,data:[],use_email:true,api_key:'tgrfd'})
  useEffect(()=>{
        axios.post(process.env.REACT_APP_API_URL+'api/forms/get-forms',{token:localStorage.getItem('token')})
        .then(res => {
          setData({loading:false,...res.data})
        }) 
  },[])

  if(data.loading){
    return(
      <main id="main" style={{height:"60vh",position:"relative"}}>
        <div className="spinner-border text-primary" role="status" style={{width:"4rem",height:"4rem",position: "absolute",top:"50%",left:"45%"}}>
          <span className="sr-only">Loading...</span>
      </div>
      </main>
    )
  }
  const dataList = data.data.map((item) =>
    <Link to={`/form/${item._id}`} key={item._id} className="list-group-item list-group-item-action apna-l">{item.name}</Link>
);

	return(
  <main id="main" className="mt-5">

    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">

<div className="card cardio m-auto shadow p-3 mb-5 bg-white rounded">
    <h2 className="mt-3 text-center apna-h">Your Forms</h2>

    <div className="card-body">

            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal">Create New</button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-info btn-block" data-toggle="modal" data-target="#exampleModal1">API Keys</button>
              </div>
            </div>
            <div className="list-group mt-4">
              {dataList}
            </div>
          </div>

    </div>
  </div>

<Popup parentdata={data} setParentdata={setData} />
<Popup2 data={data} setData={setData} />    

    </section>

  </main>
	)
}

export default Forms;