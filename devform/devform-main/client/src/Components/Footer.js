import React from 'react';
import {Link} from "react-router-dom";

const Footer = ()=>{
	return(
  <footer id="footer">

    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-contact">
            <h3>DevForms</h3>
            <p>
              A108 Adam Street <br />
              New York, NY 535022<br />
              United States <br /><br />
              <strong>Phone:</strong> +1 5589 55488 55<br />
              <strong>Email:</strong> info@example.com<br />
            </p>
          </div>

          <div className="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/">Home</Link></li>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/">How It Works</Link></li>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/contact">Contact Us</Link></li>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="#">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Service Links</h4>
            <ul>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/api">Api</Link></li>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/login">Login</Link></li>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/register">Register</Link></li>
              <li><i className="fas fa-chevron-right"></i>&nbsp;<Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Get access to live updates, improvements and new features</p>
            <form>
              <input type="email" />
              <input type="submit" />
            </form>
          </div>

        </div>
      </div>
    </div>

    <div className="container d-md-flex py-4">

      <div className="text-center m-auto">
        <div className="copyright">
          &copy; Copyright <strong><span>DevForms</span></strong>. All Rights Reserved
        </div>
      </div>
    </div>
  </footer>

	)
}

export default Footer;