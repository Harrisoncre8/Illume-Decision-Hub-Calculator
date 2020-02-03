import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'GET_QUESTION' action
function* getQuestion(action) {
  console.log('In getQuestion with', action)
  try {
    const querries = Object.entries(action.payload.querry).reduce((acum, arr) => {
      acum += `${arr[0]}=${arr[1]}&`;
      return acum;
    }, '').slice(0, -1);
    const response = yield axios.get(`/api/question?${querries}`);
    if (response.data[0].split) {
      yield put({type: `GET_SPLIT`, payload: response.data[0].question_id})
    }
    yield put({ type: `SET_QUESTION`, payload: response.data[0] })
  } catch (error) {
    // alert('Sorry, something went wrong while getting questions')
    console.log('Error getting questions in saga', error);
  }
}

function* questionSaga() {
  yield takeLatest(`GET_QUESTION`, getQuestion);
}

export default questionSaga;