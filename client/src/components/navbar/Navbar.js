// navbar/Navbar.js

import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";


import "./Navbar.scss"

class Navbar extends Component {
  


  render() {

   return (
    <Fragment>
      
      <nav className="indigo">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">tuOcasion</a>
          <ul className="right hide-on-med-and-down">
          {<li><NavLink to="/publicar" activeClassName="selectedLink" className="sidenav-close">Publicar un anuncio</NavLink></li>}
          {this.props.isNotAuth(<li><NavLink to="/entrar" activeClassName="selectedLink" className="sidenav-close">Entrar</NavLink></li>)}
          {this.props.isNotAuth(<li className="active" ><NavLink  to="/registrarse" activeClassName="selectedLink" className="sidenav-close">Registrarse</NavLink></li>)}
   {this.props.isAuth("all-roles", <li><a  data-target="slide-out" className="sidenav-close" onClick={() => this.props.logout()}>({this.props.loggedInUser && this.props.loggedInUser.username && this.props.loggedInUser.username.charAt(0).toUpperCase() + this.props.loggedInUser.username.slice(1) }) Salir</a></li>)}
          </ul>
        </div>
      </nav>
      <a href="#" data-target="slide-out" className="sidenav-trigger hide-on-large-only btn">Side nav demo</a>
      <ul id="slide-out" className="sidenav">
      
      <li><a href="#!"><i className="material-icons">cloud</i>Pedro Ramón</a></li>
        {this.props.isNotAuth(<li><NavLink to="/entrar" activeClassName="selectedLink" className="sidenav-close">Entrar</NavLink></li>)}
        {this.props.isNotAuth(<li className="active" ><NavLink  to="/registrarse" activeClassName="selectedLink" className="sidenav-close">Registrarse</NavLink></li>)}
        {this.props.isAuth("all-roles", <li><a  data-target="slide-out" className="sidenav-close" onClick={() => this.props.logout()}>Salir</a></li>)}
      <li><div className="divider"></div></li>
      <li><a className="subheader">Favoritos</a></li>
      <li><a className="waves-effect" href="#!">Coche1</a></li>
      <li><a className="waves-effect" href="#!">Coche2</a></li>

      <li><div className="divider"></div></li>
      <li><a className="subheader">Anunciados</a></li>
      <li><a className="waves-effect" href="#!">Coche1</a></li>
      <li><a className="waves-effect" href="#!">Coche2</a></li>
    </ul>
  </Fragment> 
    );  
  }
}

export default Navbar;
