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
    }

  handleCancel = () => {
    this.props.history.push('/');
  }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.company && this.state.phone && this.state.industry && this.state.email && this.state.password){
        this.props.dispatch({
            type: 'REGISTER',
            payload: {
              name: this.state.name,
              company: this.state.company,
              phone: this.state.phone,
              industry: this.state.industry,
              email: this.state.email,
              password: this.state.password,
            },
        });
    } else {
        this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
}

handleInputChangeFor = propertyName => (event) => {
    console.log('changing', event.target.value);
    this.setState({
        [propertyName]: event.target.value,
    });
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
              name="name"
              value={this.state.name}
              onChange={this.handleInputChangeFor('name')}
            />
            <label className="text-field-label register-label-name">name</label>
            <div className="text-field-mask register-mask-name"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-company" 
                type="text" 
                name="company"
                value={this.state.company}
                onChange={this.handleInputChangeFor('company')}
            />
            <label className="text-field-label register-label-company">company</label>
            <div className="text-field-mask register-mask-company"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-phone" 
              type="text" 
              name="phone"
              value={this.state.phone}
              onChange={this.handleInputChangeFor('phone')}
            />
            <label className="text-field-label register-label-phone">phone #</label>
            <div className="text-field-mask register-mask-phone"></div>
          </div>

          <div className="register-text-field-container">
            <select 
              className="dropdown register-dropdown"
              defaultValue="Select Industry"
              name="industry"
              value={this.state.industry}
              onChange={this.handleInputChangeFor('industry')}
            >
              <option disabled>Select Industry</option>
              <option>Attorney</option>
              <option>Cleaning</option>
              <option>Massage</option>
            </select>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-email" 
              type="text" 
              name="email"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
            />
            <label className="text-field-label register-label-email">email</label>
            <div className="text-field-mask register-mask-email"></div>
          </div>

          <div className="register-text-field-container">
            <input 
              className="text-field register-text-field-password" 
              type="password" 
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
            <label className="text-field-label register-label-password">password</label>
            <div className="text-field-mask register-mask-password"></div>
          </div>

{/* confirm not set up yet with state payload */}
          <div className="register-text-field-container">
            <input className="text-field register-text-field-confirm-password" type="password" />
            <label className="text-field-label register-label-confirm-password">confirm password</label>
            <div className="text-field-mask register-mask-confirm-password"></div>
          </div>

          <button className="normal-btn register-register-btn" onClick={this.registerUser}>Confirm</button>
          <hr className="register-hr" />

          <button className="register-cancel-btn" onClick={this.handleCancel}>cancel</button>

        </div>
      </center>
    );
  }
}

export default connect()(Register);