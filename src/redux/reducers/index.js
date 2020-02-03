import { combineReducers } from 'redux';
import question from './questionReducer';
import split from './splitReducer';

const rootReducer = combineReducers({
  question, // stores questions from the database
  split
});

export default rootReducer;
