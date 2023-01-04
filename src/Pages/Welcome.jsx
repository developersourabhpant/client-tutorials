import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container">
      <div className="col-md-12">
        <img src="https://ctot.com/wp-content/uploads/2016/02/jul_20_2015_08.jpg?w=700" className="welcome-section" />
        <h2 className="welcome-head">
          Lead Mangement System
        </h2>
        <div className="button-part"><Link to='/login' className="btn btn-success px-5 pt-1 me-5 mt-2">Started</Link></div>

      </div>
    </div>

  )
}

export default Welcome;









