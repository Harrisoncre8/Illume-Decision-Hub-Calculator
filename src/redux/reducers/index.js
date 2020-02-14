import { combineReducers } from 'redux';
import errors from './errorsReducer';
import previousQuestion from './previousQuestionReducer';
import input from './inputReducer';

const createReducer = (string, type=[]) => {
  return (state=type, action) => {
    switch(action.type){
      case string: 
        return action.payload;
      case 'CLEAR_ALL':
        return type;
      default:
        return state;
    }
  }
}

const rootReducer = combineReducers({
  adminIndustry: createReducer('SET_ADMIN_INDUSTRY'), // stores admin industry information
  adminQuestion: createReducer('SET_ADMIN_QUESTION'), // stores calculator questions for admin to edit
  adminSubquestion: createReducer('SET_ADMIN_SUB_QUESTION'), // store calculator sub-questions for admin to edit
  adminUserInfo: createReducer('SET_ADMIN_USER_INFO'), // stores user information for admin to edit
  disclaimer: createReducer('SET_DISCLAIMER'), // stores terms of service disclaimer
  errors, // KEEP FILE // contains registrationMessage and login Message
  industry: createReducer('SET_INDUSTRY'), // stores industry information
  input, // KEEP FILE // stores values from inputs from stepper - has a second clear in reducer listening for ALL
  passwordStatus: createReducer('MATCH_PASSWORD'), // contains password change status
  previousQuestion, // KEEP FILE // stores id of previous question for stepper - has a second clear in reducer listening for ALL
  question: createReducer('SET_QUESTION'), // stores questions from the database
  split: createReducer('SET_SPLIT'), // stores split from the database
  user: createReducer('SET_USER', {}), // stores user info - basic table (not contact info table)
  userCheckboxes: createReducer('SET_USER_CHECKBOXES'), // holds the users checkboxes
  userInfo: createReducer('SET_USER_INFO'), // stores necessary information for user edit page - this is contact info
  calcStatus: createReducer('SET_CALC_INFO'), // stores calculator toggle status on page load

});

export default rootReducer;
