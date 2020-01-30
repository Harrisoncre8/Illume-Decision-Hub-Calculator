import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Login.css';

class Login extends Component{

  render(){
    return(
      <center>
        <div className="login-container">
          <div>
            <img className="login-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="login-brand-name">illume decision hub</span>
          </div>
          <div className="login-text-field-container">
            <label className="login-label-email">Email:</label>
            <input className="text-field login-text-field-email" type="text" placeholder="email" />
          </div>
          <div className="login-text-field-container">
            <label className="login-label-password">Password:</label>
            <input className="text-field login-text-field-password" type="password" placeholder="password" />
          </div>
            <button className="normal-btn login-login-btn">Log In</button>
          <hr className="login-hr" />
          <button className="login-register-btn">register</button>
        </div>
      </center>
    );
  }
}

export default connect()(Login);