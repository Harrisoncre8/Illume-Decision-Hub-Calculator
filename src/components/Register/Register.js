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
            <label className="text-field-label register-label-name">name</label>
            <div className="text-field-mask register-mask-name"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-company" type="text" />
            <label className="text-field-label register-label-company">company</label>
            <div className="text-field-mask register-mask-company"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-phone" type="text" />
            <label className="text-field-label register-label-phone">phone #</label>
            <div className="text-field-mask register-mask-phone"></div>
          </div>

          <div className="register-text-field-container">
            <select className="dropdown register-dropdown">
              <option disabled selected value>Select Industry</option>
              <option>Attorney</option>
              <option>Cleaning</option>
              <option>Massage</option>
            </select>
          </div>

          <div className="register-text-field-container">
            <select className="dropdown register-dropdown">
              <option disabled selected value>Select Region</option>
              <option>Midwest</option>
              <option>Northeast</option>
              <option>Southwest</option>
            </select>
          </div>


          <div className="register-text-field-container">
            <input className="text-field register-text-field-email" type="text" />
            <label className="text-field-label register-label-email">email</label>
            <div className="text-field-mask register-mask-email"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-password" type="password" />
            <label className="text-field-label register-label-password">password</label>
            <div className="text-field-mask register-mask-password"></div>
          </div>

          <div className="register-text-field-container">
            <input className="text-field register-text-field-confirm-password" type="password" />
            <label className="text-field-label register-label-confirm-password">confirm password</label>
            <div className="text-field-mask register-mask-confirm-password"></div>
          </div>

          <button className="normal-btn register-register-btn">Confirm</button>
          <hr className="register-hr" />

          {/* <Link exact to="/"> */}
            <button className="register-cancel-btn">cancel</button>
          {/* </Link> */}

        </div>
      </center>
    );
  }
}

export default connect()(Register);