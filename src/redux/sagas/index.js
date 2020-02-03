import { all } from 'redux-saga/effects';
import questionSaga from './questionSaga';
import splitSaga from './splitSaga';

export default function* rootSaga() {
  yield all([
    questionSaga(),
    splitSaga()
  ]);
}
