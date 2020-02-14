import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and email set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({ type: 'GET_USER_CHECKBOXES' })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "GET_USER_INFO" actions
function* getUserInfo(action) {
  let id = action.payload;
  try {
    const response = yield axios.get(`/api/user/${id}`);
    yield put({ type: 'SET_USER_INFO', payload: response.data });
  } catch (error) {
    console.log('User get info request failed', error);
  }
}

// worker Saga: will be fired on "GET_CALC_INFO" actions
function* getCalcInfo(action) {
  let id = action.payload;
  try {
    const response = yield axios.get(`/api/user/calc/${id}`);
    yield put({ type: 'SET_CALC_INFO', payload: response.data });
  } catch (error) {
    console.log('User get info request failed', error);
  }
}

// worker Saga: will be fired on "DELETE_CALC" actions
function* deleteCalcInfo(action) {
  try {
    let id = action.payload.calcID;
    let userID = action.payload.userID;
    yield axios.delete(`/api/user/delete-calc/${id}`);
    yield put({ type: 'GET_CALC_INFO', payload: userID });
  } catch (error) {
    console.log('User get info request failed', error);
  }
}

// worker Saga: will be fired on "TOGGLE_CALC" actions
function* postCalcInfo(action) {
  try {
    let userID = action.payload.userID;
    yield axios.post(`/api/user/calc-info`, action.payload);
    yield put({ type: 'GET_CALC_INFO', payload: userID });
  } catch (error) {
    console.log('User toggle calculator request failed', error);
  }
}

// worker Saga: will be fired on "GET_USER_INFO" actions
function* putUserInfo(action) {
  try {
    yield axios.put(`/api/user/info`, action.payload);
    yield put({ type: 'GET_USER_INFO', payload: action.payload.id });
  } catch (error) {
    console.log('User put new info request failed', error);
  }
}

// worker Saga: will be fired on "PUT_USER_INDUSTRY" actions
function* putUserIndustry(action) {
  try {
    yield axios.put(`/api/user/industry`, action.payload);
    yield put({ type: 'GET_USER_INFO', payload: action.payload });
  } catch (error) {
    console.log('User put new industry request failed', error);
  }
}

// worker Saga: will be fired on "NEW_PASSWORD" actions
function* putNewPassword(action) {
  try {
    const response = yield axios.put(`/api/user/new-password`, action.payload);
    yield put({type: 'MATCH_PASSWORD', payload: response.status});
  } catch (error) {
    console.log('User put new password request failed', error);
    yield put({type: 'MATCH_PASSWORD', payload: error.response.status});
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('PUT_USER_INDUSTRY', putUserIndustry);
  yield takeLatest('GET_USER_INFO', getUserInfo);
  yield takeLatest('PUT_USER_INFO', putUserInfo);
  yield takeLatest('NEW_PASSWORD', putNewPassword);
  yield takeLatest('GET_CALC_INFO', getCalcInfo)
  yield takeLatest('DELETE_CALC', deleteCalcInfo)
  yield takeLatest('TOGGLE_CALC', postCalcInfo);
}

export default userSaga;
