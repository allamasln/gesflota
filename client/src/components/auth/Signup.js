// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './../../services/AuthService'

//signup y login son iguales a excepción de el html renderizado y el endpoint de nuestra API rest a la que llamamos
//uno llama a /signup y el otro a /login usando nuestro AuthService
class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
        this.props.getUser(response.user)
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
      <div>
        <h3>Welcome!, create your account next:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          
          <h1>{this.state.error && this.state.error.username ? this.state.error.username : ''}</h1>
          
          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </fieldset>
          <h1>{this.state.error && this.state.error.password ? this.state.error.password : ''}</h1>
          
          <input type="submit" value="Sign up" />
        </form>
      
        <h1>{(this.state.error && typeof this.state.error === 'string') ? this.state.error : ''}</h1>
      </div>
    )
  }
}

export default Signup;