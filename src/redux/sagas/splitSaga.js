import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'GET_SPLIT' action
function* getSplit(action) {
  console.log('In getSplit with', action)
  try {
    const response = yield axios.get(`/api/split/${action.payload}`);
    yield put({ type: `SET_SPLIT`, payload: response.data })
  } catch (error) {
    // alert('Sorry, something went wrong while getting questions')
    console.log('Error getting split in saga', error);
  }
}

function* splitSaga() {
  yield takeLatest(`GET_SPLIT`, getSplit);
}

export default splitSaga;