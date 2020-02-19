import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setCheckboxes(action){
  try{
    yield axios.post(`/api/checkbox`, action.payload);
    yield put({type: `GET_USER_CHECKBOXES`})
  } catch(error){
    alert('Error setting checkbox information');
  }
}

function* getUserCheckboxes(action){
  try{
    const response = yield axios.get('/api/checkbox/user')
    yield put({type: `SET_USER_CHECKBOXES`, payload: response.data});
  } catch(error){
    alert('Error retrieving checkbox information');
  }
}

function* checkboxSaga() {
  yield takeLatest(`SET_CHECKBOXES`, setCheckboxes);
  yield takeLatest(`GET_USER_CHECKBOXES`, getUserCheckboxes)
}
  
export default checkboxSaga;