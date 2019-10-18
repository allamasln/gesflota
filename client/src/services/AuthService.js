// auth/auth-service.js
import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_HOST}`,
      withCredentials: true
    });
  }

  signup = (username, password, nif, phone) => {

    return this.service.post('users/create', {username, password, nif, phone})
    .then(response => {
      

    if(response.data) { this.login(username, password).then(response => response.data ); }
    
    return response.data
    
    })
  }

  login = (username, password) => {
    return this.service.post('sessions/create', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    
    return this.service.get('users/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.delete('sessions/delete',)
    .then(response => response.data)
  }
}

export default AuthService;