import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Login.css';

class Login extends Component{

  // Store local state
  state = {
    email: '',
    password: '',
    showPassword: 'password'
  };

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

  // Push history to registration page
  handleRegister = () => {
    this.props.history.push('/register');
  }

  // Handle user log-in and push history to main user page, otherwise return an error message
  login = e => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  // using previous props to check user type for route
  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.pushHistoryToUser();
    }
  }

  // Push user to admin or user based on admin boolean
  pushHistoryToUser = () => {
    if (this.props.user && this.props.user.admin){
      this.props.history.push('/admin');
    }else if (this.props.user && this.props.user.id){
      this.props.history.push('/user');
    }else{
      this.props.history.push('/');
    }
  }

  // Show or hide password
  togglePasswordView = () => this.state.showPassword === 'password' ? this.setState({showPassword: 'text'}) : this.setState({showPassword: 'password'});

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

          <div className="text-field-container login-text-field-container">
            <input 
              className="text-field" 
              type="text" 
              onChange={(event)=>this.handleChange(event, 'email')}
            />
            <label className="text-field-label">email</label>
            <div className="text-field-mask login-email-mask"></div>
          </div>

          <div className="text-field-container login-text-field-container">
            <input 
              className="text-field" 
              type={this.state.showPassword} 
              onChange={(event)=>this.handleChange(event, 'password')}
            />

            <label className="text-field-label">password</label>
            <div className="text-field-mask login-password-mask"></div>
            <span>
              <input type="checkbox" onChange={this.togglePasswordView} />
                <label> Show Password</label>
            </span>
          </div>

          <button className="normal-btn login-login-btn" type="submit" onClick={this.login}>Log In</button>
          </form>
          <hr className="login-hr" />

          <button className="login-register-btn" onClick={this.handleRegister}>register</button>
        </div>
      </center>
    );
  }
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user,
});

export default connect(mapStateToProps)(Login);