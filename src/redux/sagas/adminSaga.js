import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminUserInfo(action){
  try{
    const response = yield axios.get(`/api/admin`);
    yield put({type: `SET_ADMIN_USER_INFO`, payload: response.data})
  } catch(error){
    console.log('Error in admin user info GET', error);
  }
}

function* adminSaga() {
  yield takeLatest(`GET_ADMIN_USER_INFO`, getAdminUserInfo);
}
  
export default adminSaga;