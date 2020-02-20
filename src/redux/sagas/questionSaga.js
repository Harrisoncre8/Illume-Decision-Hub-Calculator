import axios from 'axios';
import { put, takeLatest, takeLeading } from 'redux-saga/effects';

// worker Saga: will be fired on 'GET_QUESTION' action
function* getQuestion(action) {
  // This lets you use the same question route and just give it a different
  // query parameter to determine the function the get route does
  try {
    const queries = Object.entries(action.payload.query).reduce((acum, arr) => {
      acum += `${arr[0]}=${arr[1]}&`;
      return acum;
    }, '').slice(0, -1);
    const response = yield axios.get(`/api/question?${queries}`);
    if (response.data[0].split) {
      yield put({type: `GET_SPLIT`, payload: {question_id: response.data[0].question_id, calculator_id: response.data[0].calculator_id}})
    }
    yield put({ type: `SET_QUESTION`, payload: response.data[0] })
  } catch (error) {
    alert('Error retrieving questions');
  }
}

function* getAllQuestions(action){
  try {
    const response = yield axios.get(`/api/question/all`)
    yield put({ type: `SET_QUESTION`, payload: response.data })
  } catch (error) {
    alert('Error retrieving questions');
  }
}

function* questionSaga() {
  yield takeLeading(`GET_QUESTION`, getQuestion);
  yield takeLatest(`GET_ALL_QUESTIONS`, getAllQuestions);
}

export default questionSaga;