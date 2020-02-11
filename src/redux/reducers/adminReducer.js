import { combineReducers } from 'redux';

// Store calculator sub-questions for admin to edit
const adminSubquestion = (state = [], action) => {
  if(action.type === `SET_ADMIN_SUB_QUESTION`){
    return action.payload;
  }
  else if(action.type === `CLEAR_ADMIN_SUB_QUESTION`){
    return '';
  }
  else if(action.type === `CLEAR_ALL`){
    return []
  }
  return state;
}
  
export default combineReducers({
  adminSubquestion
});