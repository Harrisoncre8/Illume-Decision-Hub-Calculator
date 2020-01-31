import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'GET_QUESTION' action
function* getQuestion(){
    try{
        yield axios.get(`api/api/ROUTE`);
    }
    catch{

    }
}


function* questionSaga() {
    yield takeLatest(`GET_QUESTION`, getQuestion);
}
  
export default questionSaga;