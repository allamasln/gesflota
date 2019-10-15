import React, { Component, Fragment } from "react";

import { Switch, Route, Redirect, Link } from "react-router-dom";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./services/AuthService";

import OwnerPanel from "./components/ownerPanel";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();

    this.fetchUser()
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj,
    });
  };


  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: false });
    });
  };





  fetchUser() {


    return this.service
      .loggedin()
      .then(response => {
       
        this.setState({
          loggedInUser: response,
        });
      })
      .catch(err => {
        
        this.setState({
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

    console.log(this.state);
    return (

      <Fragment>
        <div className="app">
           <Navbar 
                isNotAuth={(componentTrue, componentFalse) => this.isNotAuth(componentTrue, componentFalse)}
                isAuth={(rol,componentTrue, componentFalse) => this.isAuth(rol,componentTrue, componentFalse)}
                logout={() => this.logout()} /> 
          

            <Switch>
              <Route exact path="/signup" render={() => this.isNotAuth(<Signup getUser={this.getUser} />, <Redirect to="/" />)} />
              <Route exact path="/login" render={() => this.isNotAuth(<Login getUser={this.getUser} />, <Redirect to="/" />)} />


              {/* <Route exact path="/" render={() => this.isAuth(false, <OwnerPanel />, <Redirect to="/" />)} /> */}
              
             
              <Route render={() => this.isNotAuth(<Redirect to="/login" />)} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
            <Link to="/">Proptected</Link> 
          
        </div>
      </Fragment>
    );
  }
}

export default App;
