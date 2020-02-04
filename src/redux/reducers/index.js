import { combineReducers } from 'redux';
import errors from './errorsReducer';
import admin from './adminReducer';
import industry from './industryReducer';
import question from './questionReducer';
import split from './splitReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and login Message
  question, // stores questions from the database
  admin, // stores admin information
  industry, // stores industry information
  split, // stores split from the database
  user
});

export default rootReducer;
