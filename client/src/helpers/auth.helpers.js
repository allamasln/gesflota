
import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import AuthService from "./../services/AuthService"
// const UserIsAuthentificated = () => {
  
//   let service = new AuthService();

//   let resultado = service.loggedin().then(response => { 
//     result = true;
//     return result
//   }
//   ).catch(err =>  {
//     result = false;
//     return result
//   });

//   return result;
// }


export const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("DESDE PRIVATE ROUTE: " + rest.test);
  // console.log(UserIsAuthentificated());
  return (
  <Route {...rest} render={(props) => (
    rest.test
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
  
}

export const Protected = () => <h3>Protected</h3>


