import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'GET_QUESTION' action
function* getQuestion(action){
    console.log('In getQuestion with', action)
    try{
        const response = yield axios.get(`/api/question/` + action.payload);
        yield put({type: `SET_QUESTION`, payload: response.data})
    } catch(error){
        // alert('Sorry, something went wrong while getting questions')
        console.log('Error getting questions in saga', error);
    }
}

function* questionSaga() {
    yield takeLatest(`GET_QUESTION`, getQuestion);
}
  
export default questionSaga;