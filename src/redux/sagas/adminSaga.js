import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminQuestion(action){
  try{
    const response = yield axios.get(`/api/admin/questions`);
    yield put({type: `SET_ADMIN_QUESTION`, payload: response.data});
  } catch(error){
    console.log('Error in admin questions GET', error);
  }
}

function* getAdminUserInfo(action){
  try{
    const response = yield axios.get(`/api/admin/user-info`);
    yield put({type: `SET_ADMIN_USER_INFO`, payload: response.data});
  } catch(error){
    console.log('Error in admin user info GET', error);
  }
}

function* postAdminIndustryInfo(action){
  try{
    yield axios.post(`/api/admin/industry-info`, action.payload);
    yield put({type: `GET_INDUSTRY`});
  } catch(error){
    console.log('Error in admin industry info POST', error);
  }
}

function* putAdminIndustryInfo(action){
  try{
    yield axios.put(`/api/admin/industry-info`, action.payload);
    yield put({type: `GET_INDUSTRY`});
  } catch(error){
    console.log('Error in admin industry info PUT', error);
  }
}

function* putAdminUserInfo(action){
  try{
    yield axios.put(`/api/admin/user-info`, action.payload);
    yield put({type: `GET_ADMIN_USER_INFO`});
  } catch(error){
    console.log('Error in admin user info PUT', error);
  }
}

function* adminSaga() {
  yield takeLatest(`GET_ADMIN_QUESTION`, getAdminQuestion);
  yield takeLatest(`GET_ADMIN_USER_INFO`, getAdminUserInfo);
  yield takeLatest(`POST_ADMIN_INDUSTRY_INFO`, postAdminIndustryInfo);
  yield takeLatest(`PUT_ADMIN_INDUSTRY_INFO`, putAdminIndustryInfo);
  yield takeLatest(`PUT_ADMIN_USER_INFO`, putAdminUserInfo);
}
  
export default adminSaga;