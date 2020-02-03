import { combineReducers } from 'redux';
import question from '../reducers/questionReducer';
import errors from './errorsReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and login Message
  question // stores questions from the database
});

export default rootReducer;
