import { combineReducers } from 'redux';

// Store calculator questions for admin to edit
const adminQuestion = (state = [], action) => action.type === `SET_ADMIN_QUESTION` ? action.payload : state;

// Store calculator sub-questions for admin to edit
const adminSubquestion = (state = [], action) => action.type === `SET_ADMIN_SUB_QUESTION` ? action.payload : state;

// Store user information for admin to edit
const adminUserInfo = (state = [], action) => action.type === `SET_ADMIN_USER_INFO` ? action.payload : state;
  
export default combineReducers({
  adminQuestion,
  adminSubquestion,
  adminUserInfo,
});