import React, { Component, Fragment } from "react";

import { Switch, Route, Redirect, Link } from "react-router-dom";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./services/AuthService";


import ToBuy from "./components/toBuy";
import ToPost from "./components/toPost";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      seccion: null,
    };
    this.service = new AuthService();

    this.fetchUser()
  }

  getUser = userObj => {
    this.setState({
      ...this.state,
      loggedInUser: userObj
    });
  };


  logout = () => {
    this.service.logout().then(() => {
      this.setState({ ...this.state, loggedInUser: false });
    });
  };





  fetchUser() {


    return this.service
      .loggedin()
      .then(response => {
       
        this.setState({
          ...this.state,
          loggedInUser: response,
        });
      })
      .catch(err => {
        
        this.setState({
          ...this.state,
          loggedInUser: false,
        });
      });
  }

  isAuth(rol,componentTrue, componentFalse) {
    if (this.state.loggedInUser === null) return;

    switch(rol) {

      case "all-roles": 
      
      
      if (!componentTrue && this.state.loggedInUser) return true;
      

      if (componentTrue && this.state.loggedInUser) return componentTrue;

      if(componentFalse) return componentFalse;

      return false;

      

      case "vehiclesOwner":


          if(this.state.loggedInUser && componentTrue) return componentTrue;

          if(this.state.loggedInUser && !componentTrue) return true;

          if(!this.state.loggedInUser && componentFalse) return componentFalse;

          return false

    }

    
  }


// isVehiculeOwner(component) {

//   if (this.state.loggedInUser === null) return;
  
//   return (this.state.loggedInUser === false) ? <Redirect to="/login" /> : component ;
// }

isNotAuth(componentTrue, componentFalse) {


  if (!componentTrue && !this.state.loggedInUser) return true;

    if (componentTrue && !this.state.loggedInUser) return componentTrue;

    if(componentFalse) return componentFalse;

    return false;
  
}

  render() {


    return (

      <Fragment>
        <div className="app">
           <Navbar 
                isNotAuth={(componentTrue, componentFalse) => this.isNotAuth(componentTrue, componentFalse)}
                isAuth={(rol,componentTrue, componentFalse) => this.isAuth(rol,componentTrue, componentFalse)}
                loggedInUser = {this.isAuth('all-roles',this.state.loggedInUser)}
                logout={() => this.logout()} />
                
          

            <Switch>
              <Route exact path="/registrarse" render={() => this.isNotAuth(<Signup getUser={this.getUser} />, <Redirect to="/" />)} />
              <Route exact path="/entrar" render={() => this.isNotAuth(<Login getUser={this.getUser} />, <Redirect to="/" />)} />


              <Route exact path="/" render={() => <ToBuy />} />
              
              
            <Route exact path="/publicar" render={() => this.isAuth('all-roles', <ToPost loggedInUser={this.state.loggedInUser}/>, <Redirect to="/entrar" />)} />

             
              <Route render={() => this.isNotAuth(<Redirect to="/" />)} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
            
          
        </div>
      </Fragment>
    );
  }
}

export default App;
