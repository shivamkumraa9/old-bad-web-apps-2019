import React,{useState} from 'react';
import {Link} from "react-router-dom";
import mainLogo from'./hero-bg.jpg';


const Home = ()=>{
    const [msg, setMsg] = useState("Send Message");
  const handleClick = (e)=> {
    e.preventDefault();
    setMsg("Message Sent!")
  }
	return(
<div>
  <section id="hero" className="d-flex align-items-center" style={{ backgroundImage: `url(${mainLogo})`}}>
    <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-9 text-center">
          <h1>Collect Forms Without Any Backend</h1>
              <h2>Submit Directly to our API & We'll handle the rest.</h2>
        </div>
      </div>
      <div className="text-center">
        <Link to="#about" className="btn-get-started scrollto">How It Works?</Link>
      </div>

      <div className="row icon-boxes">
        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div className="icon-box">
            <div className="icon"><i className="far fa-check-square"></i></div>
            <h4 className="title"><Link to="#">Simple To Use</Link></h4>
            <p className="description">Just set your form’s action to our endpoint. No server code required.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="300">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-laptop-code"></i></div>
            <h4 className="title"><Link to="#">Made for Developers</Link></h4>
            <p className="description">Retrieve and manage forms and submissions through our portal or use our API.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="400">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-infinity"></i></div>
            <h4 className="title"><Link to="">Unlimited forms</Link></h4>
            <p className="description">Unlimited forms. Stop paying for a Contact Us page that never gets used.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="500">
          <div className="icon-box">
            <div className="icon"><i className="far fa-file-alt"></i></div>
            <h4 className="title"><Link to="">No external libraries</Link></h4>
            <p className="description">You don't need to include a tag, script to an external library, or CSS.</p>
          </div>
        </div>

      </div>
    </div>
  </section>
  <main id="main">

    <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>How It Works</h2>
        </div>

        <div className="row content">
          <div className="col-lg-6">
            <h3 className="text-center">Your Frontend Code</h3>
            <h6 className="text-center mb-4">Add our endpoint in form's action.</h6>
<pre className=" language-markup">
  <code>
{
	`<form method="POST" 
  action="https://devform.herokuapp.com/api/forms/
        submit/606951fe45c730001511fbf8">

    <input type="text" name="name"/>
    <input type="email" name="email"/>  
    <button type="submit">Submit&lt;/button>
</form>`
}

</code>
</pre>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <h3 className="text-center">Your Submissions</h3>
            <h6 className="text-center mb-4">Safely stored in DevForms.</h6>
<pre className="language-markup">
  <code>

{`{
   "id":"6069542845c730001511fbfa",
   "data":{
      "name":"test",
      "email":"testing@gmail.com"
   },
   "time":"2021-04-04T05:52:40.929Z"
}`
}

</code>
</pre>
          </div>
        </div>

      </div>
    </section>

    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Pricing</h2>
          <p>Plans are in Indian Rupees (INR ₹).</p>
        </div>

        <div className="row">

          <div className="col-lg-4 col-md-6" data-aos="zoom-im" data-aos-delay="100">
            <div className="box">
              <h3>Free</h3>
              <h4><sup>₹</sup>0<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>500 Form Submission</li>
                <li className="na">Email Notification</li>
                <li className="na">API Access</li>
              </ul>
              <div className="btn-wrap">
                <Link to="#" className="btn-buy">Buy Now</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box featured">
              <h3>Developer</h3>
              <h4><sup>₹</sup>249<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>1000 Form Submission</li>
                <li>Email Notification</li>
                <li className="na">API Access</li>
              </ul>
              <div className="btn-wrap">
                <Link to="#" className="btn-buy">Buy Now</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box">
              <h3>Business</h3>
              <h4><sup>₹</sup>999<span>INR / month</span></h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Download Data</li>
                <li>Unlimited Form Submissions</li>
                <li>Email Notification</li>
                <li>API Access</li>
              </ul>
              <div className="btn-wrap">
                <Link to="#" className="btn-buy">Buy Now</Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>


    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Please feel to contact us if you have any questions.</p>
        </div>

        <div className="row mt-5">

          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="fas fa-map-marker-alt"></i>
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>

              <div className="email">
                <i className="fas fa-envelope"></i>
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>

              <div className="phone">
                <i className="fas fa-phone"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>

            </div>

          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form action="/" role="form" className="php-email-form" onSubmit={handleClick}>
              <div className="form-row">
                <div className="col-md-6 form-group">
                  <input type="text" required={true} name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div className="validate"></div>
                </div>
                <div className="col-md-6 form-group">
                  <input type="email" required={true} className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                  <div className="validate"></div>
                </div>
              </div>
              <div className="form-group">
                <input type="text" required={true} className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                <div className="validate"></div>
              </div>
              <div className="form-group">
                <textarea required={true} className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                <div className="validate"></div>
              </div>
              <div className="mb-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">{msg}</button></div>
            </form>

          </div>

        </div>

      </div>
    </section>

  </main>
  </div>
	)
}

export default Home;