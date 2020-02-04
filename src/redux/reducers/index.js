import { combineReducers } from 'redux';
import admin from './adminReducer';
import industry from './industryReducer';
import question from './questionReducer';
import split from './splitReducer';

const rootReducer = combineReducers({
  admin, // stores admin information
  industry, // stores industry information
  question, // stores questions from the database
  split, // stores split from the database
});

export default rootReducer;
