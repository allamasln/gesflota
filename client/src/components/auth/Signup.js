// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './../../services/AuthService'
import { Redirect} from "react-router-dom";

import './login.css'

//signup y login son iguales a excepción de el html renderizado y el endpoint de nuestra API rest a la que llamamos
//uno llama a /signup y el otro a /login usando nuestro AuthService
class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', nif: '', phone: ''};
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const nif = this.state.nif;
    const phone = this.state.phone;

    //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
    this.service.signup(username, password, nif, phone)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            nif: "",
            phone: "",
            
            
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha snifo creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
     
        this.props.getUser(response)

        
        
    })
    .catch(error => {

      function parseJsonIfStringify(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return str;
        }
        return JSON.parse(str);
      }


      this.setState({
        username: username,
        password: password,
        phone: phone,
        nif: nif,
        error: parseJsonIfStringify(error.response.data.message)
      });
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      
      <center className="fLogin">
      <br />

      <h5 className="indigo-text">Create una cuenta nueva</h5>
      <div className="section"></div>

      <div className="container">
        <div className="z-depth-1 grey lighten-4 row">

          <form className="col s12" onSubmit={this.handleFormSubmit}>
            
          <div className='row'>
              <div className='input-field col s12'>
                <input className='validate' type='text' name='phone' id='phone' value={this.state.phone} onChange={e => this.handleChange(e)}  />
                <label for='phone'>Introduce un teléfono de contacto</label>
                {this.state.error && this.state.error.phone ? <span>{this.state.error.phone}</span> : ''}
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input className='validate' type='text' name='nif' id='nif' value={this.state.nif} onChange={e => this.handleChange(e)}  />
                <label for='nif'>Introduce CIF/NIF propietario</label>
                {this.state.error && this.state.error.nif ? <span>{this.state.error.nif}</span> : ''}
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input className='validate' type='text' name='username' id='username' value={this.state.username} onChange={e => this.handleChange(e)}  />
                <label for='username'>Introduce un nombre de usuario</label>
                {this.state.error && this.state.error.username ? <span>{this.state.error.username}</span> : ''}
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input className='validate' type='password' name='password' id='password' value={this.state.password} onChange={e => this.handleChange(e)} />
                <label for='password'>Introduce un password</label>
                {this.state.error && this.state.error.password ? <span>{this.state.error.password}</span> : ''}
                
              </div>
              {(this.state.error && typeof this.state.error === 'string') ? <span>{this.state.error}</span> : ''}
            </div>
            
        
            <center>
              <div className='row'>
                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo darken-4'>Registrase</button>
              </div>
            </center>
          </form>
        </div>
      </div>
    </center>


      // <div>
    

      //   <form onSubmit={this.handleFormSubmit}>
      //     <fieldset>
      //       <label>Username:</label>
      //       <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
      //     </fieldset>
          
      //     <h1>{this.state.error && this.state.error.username ? this.state.error.username : ''}</h1>
          
      //     <fieldset>
      //       <label>Password:</label>
      //       <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
      //     </fieldset>
      //     <h1>{this.state.error && this.state.error.password ? this.state.error.password : ''}</h1>
          
      //     <input type="submit" value="Sign up" />
      //   </form>
      
      //   <h1>{(this.state.error && typeof this.state.error === 'string') ? this.state.error : ''}</h1>
      // </div>
    )
  }
}

export default Signup;