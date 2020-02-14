import React, {useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const user = useSelector(state => state.user);
  const error = useSelector(state => state.errors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('password');

  // Push history based on user type
  useEffect(()=>{
    if(user && user.admin){
      history.push('/admin');
    }
    else if(user && user.id){
      history.push('/user');
    }
    else {
      history.push('/');
    }
  }, [history, user]);

  // Add class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Push history to registration page
  const handleRegister = () => history.push('/register');

  // Handle user log-in and push history to main user page, otherwise return an error message
  const login = e => {
    e.preventDefault();
    if(email && password){
      dispatch({type: `LOGIN`, payload: {username: email, password: password}});
    }
    else {
      dispatch({type: `LOGIN_INPUT_ERROR`});
    }
  }

  // Show or hide password
  const togglePasswordView = () => showPassword === 'password' ? setShowPassword('text') : setShowPassword('password');

  return(
    <center>
      <div className="login-container">
      {error.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {error.loginMessage}
            </h2>
        )}
        <div>
          <img className="login-logo" src="illume-logo180.png" alt="illume logo" />
          <span className="login-brand-name">illume decision hub</span>
        </div>

        <form onSubmit={login}>

        <div className="text-field-container login-text-field-container">
          <input 
            className="text-field" 
            type="text" 
            onChange={(e)=>{
                        setEmail(e.target.value);
                        checkForValue(e);
                        }
                      }
          />
          <label className="text-field-label">email</label>
          <div className="text-field-mask login-email-mask"></div>
        </div>

        <div className="text-field-container login-text-field-container">
          <input 
            className="text-field" 
            type={showPassword} 
            onChange={(e)=>{
                        setPassword(e.target.value);
                        checkForValue(e);
                        }
                      }
          />

          <label className="text-field-label">password</label>
          <div className="text-field-mask login-password-mask"></div>
            <span>
              <input type="checkbox" onChange={togglePasswordView} />
                <label> Show Password</label>
            </span>
          </div>

        <button className="normal-btn login-login-btn" type="submit">Log In</button>
        </form>
        <hr className="login-hr" />

        <button className="login-register-btn" onClick={handleRegister}>register</button>
      </div>
    </center>
  );
}