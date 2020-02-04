import { all } from 'redux-saga/effects';
import admin from './adminSaga';
import industry from './industrySaga';
import question from './questionSaga';
import splitSaga from './splitSaga';

export default function* rootSaga() {
  yield all([
    admin(),
    industry(),
    question(),
    splitSaga(),
  ]);
}
