import { combineReducers } from 'redux';
import errors from './errorsReducer';
import admin from './adminReducer';
import industry from './industryReducer';
import question from './questionReducer';
import split from './splitReducer';
import user from './userReducer';
import previousQuestion from './previousQuestionReducer';
import input from './inputReducer';
import userInfo from './userInfoReducer';
import userCheckboxes from './userCheckboxesReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and login Message
  question, // stores questions from the database
  admin, // stores admin information
  industry, // stores industry information
  split, // stores split from the database
  user,
  previousQuestion, // stores id of previous question for stepper
  input, // stores values from inputs from stepper
  userInfo, // stores necessary information for user edit page
  userCheckboxes, // holds the users checkboxes
});

export default rootReducer;
