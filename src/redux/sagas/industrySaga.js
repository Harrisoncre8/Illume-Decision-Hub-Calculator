import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminIndustry(action){
  try{
    const response = yield axios.get(`/api/admin/industry`);
    yield put({type: `SET_ADMIN_INDUSTRY`, payload: response.data})
  } catch(error){
    console.log('Error in admin industry GET', error);
  }
}

function* getIndustry(action){
  try{
    const response = yield axios.get(`/api/industry`);
    yield put({type: `SET_INDUSTRY`, payload: response.data})
  } catch(error){
    console.log('Error in industry GET', error);
  }
}

function* industrySaga() {
  yield takeLatest(`GET_ADMIN_INDUSTRY`, getAdminIndustry);
  yield takeLatest(`GET_INDUSTRY`, getIndustry);
}
  
export default industrySaga;