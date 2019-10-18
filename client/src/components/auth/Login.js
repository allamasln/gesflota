// auth/Signup.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './../../services/AuthService'

import './login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {



    return ( 


      <center className="fLogin">
      <br />
      <h5 className="indigo-text">Accede con tu cuenta</h5>
      <div className="section"></div>

      <div className="container">
        <div className="z-depth-1 grey lighten-4 row">

          <form className="col s12" onSubmit={this.handleFormSubmit}>
            

            <div className='row'>
              <div className='input-field col s12'>
                <input className='validate' type='text' name='username' id='username' value={this.state.username} onChange={e => this.handleChange(e)}  />
                <label for='username'>Introduce tu nombre de usuario</label>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input className='validate' type='password' name='password' id='password' value={this.state.password} onChange={e => this.handleChange(e)} />
                <label for='password'>Introduce tu password</label>
              </div>
            
            </div>

        
            <center>
              <div className='row'>
                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo darken-4'>Entrar</button>
              </div>
            </center>
          </form>
        </div>
      </div>
      <a href="/registrarse">Crear cuenta nueva</a>
    </center>
    
    // <div>
    //   <h3>Please, login to our site</h3>

    //   <form onSubmit={this.handleFormSubmit}>
    //     <fieldset>
    //       <label>Username:</label>
    //       <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
    //     </fieldset>

    //     <fieldset>
    //       <label>Password:</label>
    //       <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
    //     </fieldset>

    //     <input type="submit" value="Login" />
    //   </form>

    //   <h1>{this.state.error ? 'Error' : ''}</h1>
    // </div>
    
    )
  }
}

export default Login;