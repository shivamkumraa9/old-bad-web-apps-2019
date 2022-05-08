import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';


const Tab3 = (props)=>{

  const [isloading,setIsloading] = useState(false)
  const [iserror,setIserror] = useState(false)
  const [data,setData] = useState(props.parentdata.form_data)

  const onSubmit = (event)=>{
    event.preventDefault();
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+`api/forms/update-form/${props.id}`,{token:localStorage.getItem('token'),...data})
      .then(res => {
         setIsloading(false)
         if(res.data.okay){

         }else{
          setIserror(true)
         }
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
<form onSubmit={onSubmit}>
      {iserror
       ? <div className="alert alert-danger" role="alert">Some Error Occured</div>
       : ''
     }
  <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" name="name" defaultValue={data.name} required={true} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label>Success Redirect</label>
    <input type="text" className="form-control" name="success" defaultValue={data.success} onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label>WhiteList Domains</label>
    <textarea name="whitelist" defaultValue={data.whitelist} className="form-control" onChange={handleChange} placeholder="www.test1.com, www.test2.com" rows="3"></textarea>
  </div>
  {
    props.parentdata.use_email
    ?
  <div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"  name="isemail" defaultChecked={data.isemail} onChange={handleChange} />
    <label className="form-check-label" htmlFor="exampleCheck1">Get Email Notification</label>
  </div>
  <div className="form-group">
    <label>Email to recieve notification</label>
    <input type="text" className="form-control" name="email" onChange={handleChange} defaultValue={data.email}  />
  </div>
  </div>
  :
  <div className="alert alert-warning" role="alert">
    Upgrade to use this email notification option
  </div>
  }

    <button className="btn btn-primary btn-lg" type="submit" >
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : 'Submit'
     }
    
</button>
</form>
  )
}

const Row = (props)=>{
  const [data,setData] = useState({})
  const [copytext,setCopytext] = useState("Copy")

  const copy = (e)=>{
    navigator.clipboard.writeText(props.data.actual)
    setCopytext("Copied")
  }
  return(
    <tr>
      <th scope="row"  data-toggle="modal" data-target={`#exampleModal${props.data._id}`}>{props.data.num}</th>
      <td data-toggle="modal" data-target={`#exampleModal${props.data._id}`}>{props.data.submitted}</td>
      <td data-toggle="modal" data-target={`#exampleModal${props.data._id}`}>{props.data.show}</td>
      <td className="text-right"><i onClick={copy} data-toggle="tooltip" data-placement="top" title={copytext} className="far fa-copy hawa"></i>&nbsp;&nbsp;&nbsp;<i onClick={()=>{props.del(props.data._id)}} data-toggle="tooltip" data-placement="top" title="Delete" className="fas fa-times-circle hawa"></i></td>
    </tr>
  )
}

const RowModel = (props)=>{
  const [copytext,setCopytext] = useState("Copy")

  const copy = (e)=>{
    navigator.clipboard.writeText(props.item.actual)
    setCopytext("Copied")
  }
  const del = (e)=>{
    document.querySelector(`#iexampleModal${props.item._id}`).click()
    props.del(props.item._id)
  }
  return(
  <div className="modal fade" id={`exampleModal${props.item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Submission</h5>
          <button id={`iexampleModal${props.item._id}`} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
  <div className="form-group">
    <label>Value</label>
    <textarea defaultValue={props.item.actual} className="form-control" rows="3"></textarea>
  </div>
    <button type="button" onClick={copy} className="btn btn-primary mr-2">{copytext}</button>
    <button type="button" onClick={del} className="btn btn-danger">Delete</button>     
  </div>
      </div>
    </div>
  </div>
  )
}

const Download = (props)=>{
  const [isloading,setIsloading] = useState(false)
  const click = (event)=>{
    setIsloading(true)
    axios
      .request({
        url : process.env.REACT_APP_API_URL+`api/forms/download/${props.id}`,
        method:'POST',
        data:{token:localStorage.getItem('token')},
        responseType: 'blob', //important
      })
      .then(({ data }) => {
        setIsloading(false)
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'file.json'); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }
  return(
    <button onClick={click} type="button" className="btn btn-primary">
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : <span><i className="fas fa-file-download"></i>  Download</span>
     }
     </button>
    )
}

const Loadmore = (props)=>{
  const [isloading,setIsloading] = useState(false)
  const [hasmore,setHasmore] = useState(true)
  const [page,setPage] = useState(1)

  const click = (event)=>{
    setIsloading(true)
    axios.post(process.env.REACT_APP_API_URL+`api/forms/load-more/${props.formid}?limit=10&page=${page}`,{token:localStorage.getItem('token')})
      .then(res => {
        setIsloading(false)
        if(res.data.okay){
          if(res.data.data.length > 0){
            const old = props.data.data
            const neww = convertor(refresh_nums(res.data.data))
          props.setData({...props.data,data:old.concat(neww)})
          setPage(page+1)
        }else{
          setHasmore(false)
        }
        }
      })
  }
  if(hasmore){
  return(
    <button onClick={click} type="button" className="btn btn-primary">
      {isloading
       ? <div className="spinner-border spinner-border-sm" style={{width: "1.5rem", height: "1.5rem"}} role="status" aria-hidden="true"></div>
       : 'Load More'
     }
     </button>
    )
  }
  return(
      <p>No More Submissions</p>
    )
}

const convertor = (data)=>{
  const result = []
  data.forEach((item,index)=>{
    item.show = JSON.stringify(item.actual).slice(0,30) + '...'
    item.actual = JSON.stringify(item.actual)
    result.push(item)
  })
  return result;
}

const refresh_nums = (data) =>{
  const result = []
  data.forEach((item,index)=>{
    item.num = index + 1
    result.push(item)
  })
  return result;
}

const Form = (props)=>{
  const [data,setData] = useState({legal:true,loading:true,data:[],form_data:{},use_email:false,api_key:'tgrfd'})
  useEffect(()=>{
      axios.post(process.env.REACT_APP_API_URL+`api/forms/get-form/${props.id}`,{token:localStorage.getItem('token')})
        .then(res => {
          if(res.data.okay){
            setData({loading:false,legal:true,...res.data,data:refresh_nums(convertor(res.data.data))})
          }else{
            setData({...data,loading:false,legal:false})
          }
        })
  },[])

  const refresh = ()=>{
    axios.post(process.env.REACT_APP_API_URL+`api/forms/load-more/${props.id}?limit=10&page=0`,{token:localStorage.getItem('token')})
      .then(res => {
        if(res.data.okay){
          setData({...data,data:convertor(refresh_nums(res.data.data))})
        }else{
        }
      })
  }

  const del = (_id)=>{
    let arr = data.data;
    arr = arr.filter(function( obj ) {
    return obj._id !== _id;});
    setData({...data,data:refresh_nums(arr)})
    axios.post(process.env.REACT_APP_API_URL+`api/forms/delete-submission/${props.id}/${_id}`,{token:localStorage.getItem('token')})
  }

  if(data.loading){
    return(
      <main id="main" style={{height:"60vh",position:"relative"}}>
        <div className="spinner-border text-primary" role="status" style={{width:"4rem",height:"4rem",position: "absolute",top:"50%",left:"45%"}}>
          <span className="sr-only">Loading...</span>
      </div>
      </main>
    )
  }

  if(!data.legal){
    return( 
      <main id="main" style={{height:"60vh"}}>
      <div className="container" style={{marginTop:"100px"}}>
      <div className="alert alert-danger text-center" role="alert">
        Form Not Found
      </div>
      </div>
      </main>

    )
  }
  const dataList = data.data.map((item) =>
    <Row data={item} key={item._id} del={del} />
);
  const dataModels = data.data.map((item) =>
    <RowModel item={item} key={item._id} del={del} />
);
	return(
  <main id="main" className="mt-5">

    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h1 style={{fontWeight: 'bold',color: '#124265'}}>Your Form</h1>
        </div>
<ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Endpoint</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Submissions</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Settings</a>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">

  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
    <hr />
    <p className="mt-3">This submission endpoint can be used inside a standard action attribute, or you can POST to it with an http request.</p>
<pre className=" language-markup"><code>https://devform.herokuapp.com/api/forms/submit/{props.id} </code></pre>

<pre className=" language-markup"><code>&lt;form method="post" action="https://devform.herokuapp.com/api/forms/submit/{props.id}">&lt;/form></code></pre>
  </div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
    <hr />
<div className="row mt-2 mb-2">
  <div className="col align-self-center">
    <h6 className="ml-2"><i onClick={refresh} className="fas fa-sync-alt hawa"></i>&nbsp;&nbsp;Refresh</h6>
  </div>
  <div className="col text-right">
    <Download id={props.id} />
  </div>
</div>

<table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Submitted</th>
      <th scope="col">Data</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
      {dataList}

</tbody>

</table>
{
  dataList.length >0
  ?
  <div className="text-center mt-4"><Loadmore data={data} formid={props.id} setData={setData}  /></div>
  :
  <p className="text-center mt-4">No Submissions</p>
}
  </div>

  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
    <hr />
    <Tab3 parentdata={data} id={props.id} />
  </div>
</div>
  </div>
        
    </section>
{dataModels}
  </main>
	)
}

export default Form;