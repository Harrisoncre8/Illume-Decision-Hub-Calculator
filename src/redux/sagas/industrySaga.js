import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getIndustry(action){
  try{
    const response = yield axios.get(`/api/industry`);
    yield put({type: `SET_INDUSTRY`, payload: response.data})
  } catch(error){
    console.log('Error in admin user info GET', error);
  }
}

function* industrySaga() {
  yield takeLatest(`GET_INDUSTRY`, getIndustry);
}
  
export default industrySaga;