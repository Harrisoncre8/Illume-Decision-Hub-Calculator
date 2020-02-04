import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.css';

class Register extends Component{

  state = {
    name: '',
    company: '',
    phone: '',
    industry: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  render(){
    return(
      <center>
        <div className="register-container">

          <div>
            <img className="register-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="register-brand-name">illume decision hub</span>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-name" 
              type="text" 
              onChange={(event)=>this.handleChange(event, 'name')}
            />
            <label className="text-field-label register-label-name">name</label>
            <div className="text-field-mask register-mask-name"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-company" 
              type="text" 
              onChange={(event)=>this.handleChange(event, 'company')}
            />
            <label className="text-field-label register-label-company">company</label>
            <div className="text-field-mask register-mask-company"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-phone" 
              type="text" 
              onChange={(event)=>this.handleChange(event, 'phone')}
            />
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
            <input 
              className="text-field register-text-field-email" 
              type="text" 
              onChange={(event)=>this.handleChange(event, 'email')}
            />
            <label className="text-field-label register-label-email">email</label>
            <div className="text-field-mask register-mask-email"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-password" 
              type="password" 
              onChange={(event)=>this.handleChange(event, 'password')}
            />
            <label className="text-field-label register-label-password">password</label>
            <div className="text-field-mask register-mask-password"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-confirm-password" 
              type="password" 
              onChange={(event)=>this.handleChange(event, 'confirmPassword')}
            />
            <label className="text-field-label register-label-confirm-password">confirm password</label>
            <div className="text-field-mask register-mask-confirm-password"></div>
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