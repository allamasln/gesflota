// navbar/Navbar.js

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";


import "./Navbar.scss"

class Navbar extends Component {
  


  render() {

   return (


 
 <nav>

   <div className="nav-wrapper">

     <a href="#!" className="brand-logo">Logo</a>

     <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>

     <ul className="right hide-on-med-and-down">

        {this.props.isNotAuth(<li className="active"><Link to="/signup">Signup</Link></li>)}
        {this.props.isNotAuth(<li><Link to="/login">Login</Link></li>)}
        {this.props.isAuth("all-roles", <li><a onClick={() => this.props.logout()}>Logout</a></li>)}

     </ul>

     <ul className="side-nav" id="mobile-demo">

        {this.props.isNotAuth(<li className="active"><Link  to="/signup">Signup</Link></li>)}
        {this.props.isNotAuth(<li><Link to="/login">Login</Link></li>)}
        {this.props.isAuth("all-roles", <li><a  data-target="slide-out" className="sidenav-trigger" onClick={() => this.props.logout()}>Logout</a></li>)}

     </ul>

   </div>

 </nav>

    

   


   

 
    );  
  }
}

export default Navbar;
