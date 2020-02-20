import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteAdminIndustryInfo(action){
  try{
    yield axios.delete(`/api/admin/industry-info/${action.payload}`);
    yield put({type: `GET_ADMIN_INDUSTRY`});
  } catch(error){
    alert('Error deleting industry');
  }
}

function* getAdminQuestion(action){
  try{
    const response = yield axios.get(`/api/admin/questions/${action.payload}`);
    yield put({type: `SET_ADMIN_QUESTION`, payload: response.data});
  } catch(error){
    alert('Error retrieving main questions');
  }
}

function* getAdminSubquestion(action){
  try{
    const response = yield axios.get(`/api/admin/subquestions`);
    yield put({type: `SET_ADMIN_SUB_QUESTION`, payload: response.data});
  } catch(error){
    alert('Error retrieving sub-questions');
  }
}

function* getAdminUserInfo(action){
  try{
    const response = yield axios.get(`/api/admin/user-info`);
    yield put({type: `SET_ADMIN_USER_INFO`, payload: response.data});
  } catch(error){
    alert('Error retrieving user information');
  }
}

function* postAdminIndustryInfo(action){
  try{
    yield axios.post(`/api/admin/industry-info`, action.payload);
    yield put({type: `GET_ADMIN_INDUSTRY`});
  } catch(error){
    alert('Error adding new industry');
  }
}

function* putAdminIndustryInfo(action){
  try{
    yield axios.put(`/api/admin/industry-info`, action.payload);
    yield put({type: `GET_ADMIN_INDUSTRY`});
  } catch(error){
    alert('Error updating industry');
  }
}

function* putAdminNewPassword(action) {
  try {
    yield axios.put(`/api/admin/new-password`, action.payload);
  } catch (error) {
    alert('Error updating password');
  }
}

function* putAdminQuestion(action){
  try{
    yield axios.put(`/api/admin/question`, action.payload);
    yield put({type: `GET_ADMIN_QUESTION`, payload: action.payload[3]});
  } catch(error){
    alert('Error updating main question');
  }
}

function* putAdminSubquestion(action){
  try{
    yield axios.put(`/api/admin/question`, action.payload);
    yield put({type: `GET_ADMIN_SUB_QUESTION`, payload: action.payload[3]});
  } catch(error){
    alert('Error updating sub-question');
  }
}

// changes user-information and password
function* putAdminUserInfo(action){
  try{
    yield axios.put(`/api/admin/user-info`, action.payload);
    yield put({type: `GET_ADMIN_USER_INFO`});
  } catch(error){
    alert('Error updating user information');
  }
}

function* adminSaga() {
  yield takeLatest(`DELETE_ADMIN_INDUSTRY_INFO`, deleteAdminIndustryInfo);
  yield takeLatest(`GET_ADMIN_QUESTION`, getAdminQuestion);
  yield takeLatest(`GET_ADMIN_SUB_QUESTION`, getAdminSubquestion);
  yield takeLatest(`GET_ADMIN_USER_INFO`, getAdminUserInfo);
  yield takeLatest(`POST_ADMIN_INDUSTRY_INFO`, postAdminIndustryInfo);
  yield takeLatest(`PUT_ADMIN_INDUSTRY_INFO`, putAdminIndustryInfo);
  yield takeLatest(`PUT_ADMIN_NEW_PASSWORD`, putAdminNewPassword);
  yield takeLatest(`PUT_ADMIN_QUESTION`, putAdminQuestion);
  yield takeLatest(`PUT_ADMIN_SUB_QUESTION`, putAdminSubquestion);
  yield takeLatest(`PUT_ADMIN_USER_INFO`, putAdminUserInfo);
}
  
export default adminSaga;