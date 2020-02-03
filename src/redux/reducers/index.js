import { combineReducers } from 'redux';
import admin from './adminReducer';
import industry from './industryReducer';
import question from './questionReducer';

const rootReducer = combineReducers({
  admin, // stores admin information
  industry, // stores industry information
  question, // stores questions from the database
});

export default rootReducer;
