import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Login.css';
import { stat } from 'fs';

class Login extends Component{
  state = {
    email: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
        [propertyName]: event.target.value,
    });
  }

  handleRegister = () => {
    this.props.history.push('/register');
  }

  render(){
    return(
      <center>
        <div className="login-container">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
          <div>
            <img className="login-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="login-brand-name">illume decision hub</span>
          </div>
          <form onSubmit={this.login}>
            <div className="login-text-field-container">
              <input className="text-field login-text-field-email" type="text" />
              <label 
                className="text-field-label login-label-email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}>
                  email
              </label>
              <div className="text-field-mask login-email-mask"></div>
            </div>

            <div className="login-text-field-container">
              <input className="text-field login-text-field-password" type="password" />
              <label 
                className="text-field-label login-label-password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}>
                  password
              </label>
              <div className="text-field-mask login-password-mask"></div>
            </div>

          <button className="normal-btn login-login-btn" onClick={this.login}>Log In</button>
          
          <hr className="login-hr" />

          <button className="login-register-btn" onClick={this.handleRegister}>register</button>
          </form>
        </div>
      </center>
    );
  }
}


const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(Login);