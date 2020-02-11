import { combineReducers } from 'redux';
import errors from './errorsReducer';
import admin from './adminReducer';
import user from './userReducer';
import previousQuestion from './previousQuestionReducer';
import input from './inputReducer';
import userCheckboxes from './userCheckboxesReducer';

const createReducer = (string, type=[]) => (state=type, action) => action.type === string ? action.payload : state;


const rootReducer = combineReducers({
  errors, // contains registrationMessage and login Message
  question: createReducer('SET_QUESTION'), // stores questions from the database
  admin, // stores admin information
  industry: createReducer('SET_INDUSTRY'), // stores industry information
  split: createReducer('SET_SPLIT'), // stores split from the database
  user,
  passwordStatus: createReducer('MATCH_PASSWORD'), // contains password change status
  previousQuestion, // stores id of previous question for stepper
  input, // stores values from inputs from stepper
  userInfo: createReducer('SET_USER_INFO'), // stores necessary information for user edit page
  userCheckboxes, // holds the users checkboxes
});

export default rootReducer;
