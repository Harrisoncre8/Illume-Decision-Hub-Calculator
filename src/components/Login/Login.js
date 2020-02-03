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
            <input className="text-field login-text-field-email" type="text" />
            <label className="text-field-label login-label-email">email</label>
            <div className="text-field-mask login-email-mask"></div>
          </div>

          <div className="login-text-field-container">
            <input className="text-field login-text-field-password" type="password" />
            <label className="text-field-label login-label-password">password</label>
            <div className="text-field-mask login-password-mask"></div>
          </div>

          <button className="normal-btn login-login-btn">Log In</button>
          
          <hr className="login-hr" />

          {/* <Link exact to="/register"> */}
            <button className="login-register-btn">register</button>
          {/* </Link> */}

        </div>
      </center>
    );
  }
}

export default connect()(Login);