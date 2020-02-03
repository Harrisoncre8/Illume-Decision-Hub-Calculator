import { all } from 'redux-saga/effects';
import admin from './adminSaga';
import question from './questionSaga';

export default function* rootSaga() {
  yield all([
    admin(),
    question(),
  ]);
}
