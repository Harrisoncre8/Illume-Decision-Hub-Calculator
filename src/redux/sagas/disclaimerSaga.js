import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getDisclaimer(action){
  try{
    const response = yield axios.get('/api/disclaimer')
    yield put({type: `SET_DISCLAIMER`, payload: response.data});
  } catch(error){
    alert('Error retrieving Terms of Service agreement');
  }
}

function* disclaimerSaga() {
  yield takeLatest(`GET_DISCLAIMER`, getDisclaimer);
}
  
export default disclaimerSaga;