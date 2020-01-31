import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.css';

class Register extends Component{

  render(){
    return(
      <center>
        <div className="register-container">

          <div>
            <img className="register-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="register-brand-name">illume decision hub</span>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-name" type="text" />
            <label className="register-label-name">name</label>
            <div className="text-field-mask register-name-mask"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-company" type="text" />
            <label className="register-label-company">company</label>
            <div className="text-field-mask register-company-mask"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-phone" type="text" />
            <label className="register-label-phone">phone #</label>
            <div className="text-field-mask register-phone-mask"></div>
          </div>

          <div className="register-text-field-container">
            DROPDOWN WITH INDUSTRY LIST
          </div>

          <div className="register-text-field-container">
            DROPDOWN WITH REGION LIST
          </div>


          <div className="register-text-field-container">
            <input className="text-field register-text-field-email" type="text" />
            <label className="register-label-email">email</label>
            <div className="text-field-mask register-email-mask"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-password" type="password" />
            <label className="register-label-password">password</label>
            <div className="text-field-mask register-password-mask"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-password" type="password" />
            <label className="register-label-password">confirm password</label>
            <div className="text-field-mask register-password-mask"></div>
          </div>

          <button className="normal-btn register-register-btn">Confirm</button>
          <hr className="register-hr" />
          <button className="register-cancel-btn">cancel</button>
        </div>
      </center>
    );
  }
}

export default connect()(Register);