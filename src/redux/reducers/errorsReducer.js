import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your email and password';
    case 'LOGIN_FAILED':
      return 'The email and password didn\'t match';
    case 'LOGIN_FAILED_NO_CODE':
      return 'Do you have an internet connection?';
    case 'CLEAR_ALL':
        return [];
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose an email and password';
    case 'REGISTRATION_FAILED':
      return 'That email might already be taken';
    case 'REGISTRATION_TOS_NOT_CHECKED':
      return 'Please check the Terms of Service box to continue';
    case 'CLEAR_ALL':
      return [];
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});
