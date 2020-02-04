import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Login.css';

class Login extends Component{

  state = {
    email: '',
    password: ''
  }

  // Adds class if input has a value, removes the class if input has no value
  checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Sets local state to current input value, adds or removes class based on input's value
  handleChange = (e, propName) => {
    this.setState({
      ...this.state,
      [propName]: e.target.value
    });
    this.checkForValue(e);
  }
  
  handleLogin = () => {
    // Enter code to handle logging user in
  }

  handleRegister = () => {
    this.props.history.push('/register');
  }

  render(){
    return(
      <center>
        <div className="login-container">

          <div>
            <img className="login-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="login-brand-name">illume decision hub</span>
          </div>

          <div className="login-text-field-container">
            <input 
              className="text-field login-text-field-email" 
              type="text" 
              onChange={(event)=>this.handleChange(event, 'email')}
            />
            <label className="text-field-label login-label-email">email</label>
            <div className="text-field-mask login-email-mask"></div>
          </div>

          <div className="login-text-field-container">
            <input 
              className="text-field login-text-field-password" 
              type="password" 
              onChange={(event)=>this.handleChange(event, 'password')}
            />
            <label className="text-field-label login-label-password">password</label>
            <div className="text-field-mask login-password-mask"></div>
          </div>

          <button className="normal-btn login-login-btn" onClick={this.handleLogin}>Log In</button>
          
          <hr className="login-hr" />

          <button className="login-register-btn" onClick={this.handleRegister}>register</button>

        </div>
      </center>
    );
  }
}

export default connect()(Login);