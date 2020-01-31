import { all } from 'redux-saga/effects';
import questionSaga from '../sagas/questionSaga';

export default function* rootSaga() {
  yield all([
    questionSaga()
  ]);
}
