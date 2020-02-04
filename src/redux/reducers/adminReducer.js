import { combineReducers } from 'redux';

// Store user information for admin to edit
const adminQuestion = (state = [], action) => action.type === `SET_ADMIN_QUESTION` ? action.payload : state;

// Store user information for admin to edit
const adminUserInfo = (state = [], action) => action.type === `SET_ADMIN_USER_INFO` ? action.payload : state;
  
export default combineReducers({
  adminQuestion,
  adminUserInfo,
});