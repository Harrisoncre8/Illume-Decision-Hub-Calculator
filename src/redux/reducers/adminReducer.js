import { combineReducers } from 'redux';

// Store calculator questions for admin to edit
const adminQuestion = (state = [], action) => action.type === `SET_ADMIN_QUESTION` ? action.payload : state;

// Store calculator sub-questions for admin to edit
const adminSubquestionFour = (state = [], action) => {
  if(action.type === `SET_ADMIN_SUB_QUESTION_4`){
    return action.payload;
  }
  else if(action.type === `CLEAR_ADMIN_SUB_QUESTION`){
    return '';
  }
  return state;
}

// Store calculator sub-questions for admin to edit
const adminSubquestionThree = (state = [], action) => {
  if(action.type === `SET_ADMIN_SUB_QUESTION_3`){
    return action.payload;
  }
  else if(action.type === `CLEAR_ADMIN_SUB_QUESTION`){
    return '';
  }
  return state;
}

// Store user information for admin to edit
const adminUserInfo = (state = [], action) => action.type === `SET_ADMIN_USER_INFO` ? action.payload : state;
  
export default combineReducers({
  adminQuestion,
  adminSubquestionFour,
  adminSubquestionThree,
  adminUserInfo,
});