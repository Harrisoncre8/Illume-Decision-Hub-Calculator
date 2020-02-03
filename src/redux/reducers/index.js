import { combineReducers } from 'redux';
import admin from './adminReducer';
import question from './questionReducer';

const rootReducer = combineReducers({
  admin, // stores admin information
  question, // stores questions from the database
});

export default rootReducer;
