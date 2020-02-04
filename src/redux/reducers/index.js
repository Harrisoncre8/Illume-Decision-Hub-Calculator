import { combineReducers } from 'redux';
import question from '../reducers/questionReducer';
import errors from './errorsReducer';
import admin from './adminReducer';
import industry from './industryReducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and login Message
  question, // stores questions from the database
  admin, // stores admin information
  industry, // stores industry information
});

export default rootReducer;
