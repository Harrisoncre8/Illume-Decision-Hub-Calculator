import { combineReducers } from 'redux';
import question from '../reducers/questionReducer';

const rootReducer = combineReducers({
  question // stores questions from the database
});

export default rootReducer;
