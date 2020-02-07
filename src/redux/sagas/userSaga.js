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

// worker Saga: will be fired on "PUT_USER_INFO" actions
function* putUserInfo(action) {
  try {
    yield axios.put(`/api/user/info`, action.payload);
    yield put({ type: 'GET_USER_INFO', payload: action.payload.id });
  } catch (error) {
    console.log('User put new info request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('GET_USER_INFO', getUserInfo);
  yield takeLatest('PUT_USER_INFO', putUserInfo);
}

export default userSaga;
