import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminIndustry(action){
  try{
    const response = yield axios.get(`/api/admin/industry`);
    yield put({type: `SET_ADMIN_INDUSTRY`, payload: response.data})
  } catch(error){
    alert('Error retrieving industries');
  }
}

function* getIndustry(action){
  try{
    const response = yield axios.get(`/api/industry`);
    yield put({type: `SET_INDUSTRY`, payload: response.data})
  } catch(error){
    alert('Error retrieving industries');
  }
}

function* industrySaga() {
  yield takeLatest(`GET_ADMIN_INDUSTRY`, getAdminIndustry);
  yield takeLatest(`GET_INDUSTRY`, getIndustry);
}
  
export default industrySaga;