import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import questionSaga from '../sagas/questionSaga';
import admin from './adminSaga';
import disclaimer from './disclaimerSaga';
import industry from './industrySaga';
import question from './questionSaga';
import splitSaga from './splitSaga';
import checkboxSaga from './checkedSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    questionSaga(),    
    admin(),
    industry(),
    question(),
    splitSaga(),
    checkboxSaga(),
    disclaimer(),
  ]);
}
