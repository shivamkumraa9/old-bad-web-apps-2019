import React from 'react';
import Css from '../index.css'

const Home = () => {
	return(
		<div className="home-page">
  <section id="hero" className="d-flex align-items-center">
    <div className="container position-relative" data-aos="fade-up">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-9 text-center">
          <h1>Advanced Interview Coding Problems</h1>
          <h2>Delivered to your inbox Everyday</h2>
        </div>
      </div>
      <div className="text-center">
        <a href="#pricing" className="btn-get-started scrollto">Check Pricing</a>
      </div>

      <div className="row icon-boxes">
        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos-delay="200">
          <div className="icon-box text-center">
            <div className="icon"><i className="fas fa-layer-group"></i></div>
            <h4 className="title"><a href="">Lorem Ipsum</a></h4>
            <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos-delay="300">
          <div className="icon-box text-center">
            <div className="icon"><i className="fas fa-palette"></i></div>
            <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
            <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos-delay="400">
          <div className="icon-box text-center">
            <div className="icon"><i className="fas fa-terminal"></i></div>
            <h4 className="title"><a href="">Magni Dolores</a></h4>
            <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos-delay="500">
          <div className="icon-box text-center">
            <div className="icon"><i className="fas fa-fingerprint"></i></div>
            <h4 className="title"><a href="">Nemo Enim</a></h4>
            <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <main id="main">



    <section id="pricing" className="pricing">
      <div className="container justify-content-center" data-aos="fade-up">

        <div className="section-title">
          <h2>Pricing</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>



        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
            <div className="box featured">
              <h3>Free</h3>
              <h4><sup>$</sup>0<span></span></h4>
              <ul>
                <li>30 Coding Questions per month</li>
                <li className="na">Access to solutions</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
            <div className="box featured">
              <h3>Paid</h3>
              <h4><sup>$</sup>8<span></span></h4>
              <ul>
                <li>30 Coding Questions per month</li>
                <li>Access to solutions</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  </main>
		</div>
	)
}

export default Home;