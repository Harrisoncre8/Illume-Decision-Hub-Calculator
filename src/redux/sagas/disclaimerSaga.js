import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getDisclaimer(action){
  try{
    const response = yield axios.get('/api/disclaimer')
    yield put({type: `SET_DISCLAIMER`, payload: response.data});
  } catch(error){
    console.log('Error in GET disclaimer', error);
  }
}

function* disclaimerSaga() {
  yield takeLatest(`GET_DISCLAIMER`, getDisclaimer);
}
  
export default disclaimerSaga;