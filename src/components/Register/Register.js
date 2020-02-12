import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.css';

class Register extends Component{

  //Store local state
  state = {
    name: '',
    company: '',
    phone: '',
    industry: '',
    email: '',
    password: '',
    showPassword: 'password'
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
  
  // Return to login page
  handleCancel = () => {
    this.props.history.push('/');
  }

  // Push history to new user page
  pushHistoryToUser = () => {
    this.props.history.push('/new-user');
  }

  // Log new user information into database, push history to new user page
  registerUser = e => {
    e.preventDefault();
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
    this.pushHistoryToUser();
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  }
    // Show or hide password
    togglePasswordView = () => this.state.showPassword === 'password' ? this.setState({showPassword: 'text'}) : this.setState({showPassword: 'password'});

  render(){
    return(
      <center>
        <div className="register-container">

          <div>
            <img className="register-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="register-brand-name">illume decision hub</span>
          </div>

          <div className="text-field-container">
            <input 
              className="text-field" 
              type="text" 
              name="name"
              value={this.state.name}
              onChange={(event)=>this.handleChange(event, 'name')}
            />
            <label className="text-field-label">name</label>
            <div className="text-field-mask register-mask-name"></div>
          </div>

          <div className="text-field-container">
            <input 
              className="text-field" 
                type="text" 
                name="company"
                value={this.state.company}
                onChange={(event)=>this.handleChange(event, 'company')}
            />
            <label className="text-field-label">company</label>
            <div className="text-field-mask register-mask-company"></div>
          </div>

          <div className="text-field-container">
            <input 
              className="text-field" 
              type="text" 
              name="phone"
              value={this.state.phone}
              onChange={(event)=>this.handleChange(event, 'phone')}
            />
            <label className="text-field-label">phone #</label>
            <div className="text-field-mask register-mask-phone"></div>
          </div>

          <div className="text-field-container">
            <select 
              className="dropdown register-dropdown"
              defaultValue="Select Industry"
              name="industry"
              value={this.state.industry}
              onChange={(event)=>this.handleChange(event, 'industry')}
            >
              <option className="dropdown-option" value='' disabled>Select Industry</option>
              <option className="dropdown-option" value={1}>Attorney</option>
              <option className="dropdown-option" value={2}>Cleaning</option>
              <option className="dropdown-option" value={3}>Massage</option>
            </select>
          </div>

          <div className="text-field-container">
            <input 
              className="text-field" 
              type="text" 
              name="email"
              value={this.state.email}
              onChange={(event)=>this.handleChange(event, 'email')}
            />
            <label className="text-field-label">email</label>
            <div className="text-field-mask register-mask-email"></div>
          </div>

          <div className="text-field-container">
            <input 
              className="text-field" 
              type={this.state.showPassword} 
              onChange={(event)=>this.handleChange(event, 'password')}
            />
            <label className="text-field-label">password</label>
            <div className="text-field-mask register-mask-password"></div>
            <span>
              <input type="checkbox" onClick={this.togglePasswordView} />
                <label> Show Password</label>
            </span>
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