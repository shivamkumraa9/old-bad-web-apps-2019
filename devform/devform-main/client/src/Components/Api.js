import React from 'react';
import {Link} from "react-router-dom";

const Api = ()=>{
  return(
  <main id="main" className="mt-5">

    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h1 style={{fontFamily: "Open Sans!important", fontWeight: 'bold',color: "#124265"}}>OUR API</h1>
        </div>

        <h3 style={{fontWeight: "bold",color:"#124265"}}>INTRODUCTION</h3>
        <hr />
        <p>The DevForm API is available to all users But in order to use that you need your api keys which can be find on the dashboard page.</p>
        <h3 className="mt-5" style={{fontFamily: "Open Sans', sans-serif", fontWeight: 'bold',color: "#124265"}}>/api/forms/v1</h3>
        <hr />
        <h5 style={{fontWeight: "bold"}}>Method : GET</h5>
        <p>Get a list of all forms in your account.</p>
        <h6 style={{fontWeight: "bold"}}>Example Request:</h6>
        <pre className=" language-markup"><code>curl -H "token: efhci...04fj4" "https://devform.herokuapp.com/api/forms/v1"</code></pre>
        <h6 style={{fontWeight: "bold"}}>Example Response:</h6>
        <pre className=" language-markup"><code>{`{
   "data":[
      {
         "id":"606951fe45c730001511fbf8",
         "name":"testing",
         "submissions":3
      },
      {
         "id":"6069556745c730001511fbfc",
         "name":"Test Form2",
         "submissions":0
      }
   ]
}`}</code></pre>
        <h3 className="mt-5" style={{fontFamily: "Open Sans', sans-serif", fontWeight: 'bold',color: "#124265"}}>/api/forms/v1/&lt;id></h3>
        <hr />
        <h5 style={{fontWeight: "bold"}}>Method : GET</h5>
        <p>Get general information about any specific form from your account.</p>
        <h6 style={{fontWeight: "bold"}}>Example Request:</h6>
        <pre className=" language-markup"><code>curl -H "token: efhci...04fj4" "https://devform.herokuapp.com/api/forms/v1/77c42f0f-..."</code></pre>
        <h6 style={{fontWeight: "bold"}}>Example Response:</h6>
        <pre className=" language-markup"><code>{`{
   "name":"testing",
   "id":"606951fe45c730001511fbf8",
   "success":"https://youtube.com",
   "whitelist":[
      
   ],
   "submissions":3

}`}</code></pre>
        <h3 className="mt-5" style={{fontFamily: "Open Sans', sans-serif", fontWeight: 'bold',color: "#124265"}}>/api/forms/v1/&lt;id>/submissions</h3>
        <hr />
        <h5 style={{fontWeight: "bold"}}>Method : GET</h5>
        <p>Get form submissions data of any of your form. You can also use limit(default is 10) and page(default is 0) options to set number of results per page and Which page of results respectively.</p>
        <h6 style={{fontWeight: "bold"}}>Example Request:</h6>
        <pre className=" language-markup"><code>curl -H "token: efhci...04fj4" "https://devform.herokuapp.com/api/forms/v1/77c42f0f-.../submissions?page=0&limit=10"</code></pre>
        <h6 style={{fontWeight: "bold"}}>Example Response:</h6>
        <pre className=" language-markup"><code>{`{
   "data":[
      {
         "id":"6069542845c730001511fbfa",
         "data":{
            "name":"test",
            "email":"testing@gmail.com"
         },
         "time":"2021-04-04T05:52:40.929Z"
      },
      {
         "id":"6069549845c730001511fbfb",
         "data":{
            "name":"tester",
            "email":"testing@gmail.com"
         },
         "time":"2021-04-04T05:54:32.742Z"
      },
      {
         "id":"606955b645c730001511fbfd",
         "data":{
            "name":"Tet",
            "email":"test@gmail.com"
         },
         "time":"2021-04-04T05:59:18.264Z"
      }
   ]
}`}</code></pre>
      </div>
    </section>
  </main>
  )
}

export default Api;