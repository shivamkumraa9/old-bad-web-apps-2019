import React from 'react';
import {Link} from "react-router-dom";

const PasswordResetDone = ()=>{
	return(
  <main id="main" className="mt-5">

    <section id="testimonials" className="testimonials">

<div className="container">
<div className="alert alert-primary" role="alert">
  New Password Has Been Set <Link to="/login" class="alert-link"> Login</Link> to continue
</div>
</div>

</section>

  </main>
	)
}

export default PasswordResetDone;