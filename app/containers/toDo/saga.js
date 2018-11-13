import { call, put, select, takeLatest , takeEvery} from 'redux-saga/effects';
import {STATUS} from "./constants";
import axios from "axios";

// axios.get('/api');
//  NOTE: export default function* something: here "*" means that this function is the generator function
// means it will not go through every line again in the function but will just start from where it left
// yield act as return in generator functions. You call yield in a normal function but it is only allowed in a generator


// 1. create worker saga: yhan hum sara saga ka kaam likhenge
export function* apiCall () {
  // console.log("api call");
  try { 
    console.log("api call");
    //  call helps in making an api request
    const response = yield call(axios.get, "http://jsonplaceholder.typicode.com/posts");
    console.log("response of the request", response.data);
    // put helps in returning an action to the store from where we can use the data in our app
    yield put({type: "API_SUCCESS", data: response.data});
    console.log("put success");
  } catch (e) {
    //catch error
    console.log("request failed!");
    yield put({type: "API_FAIL", message: e.message});
  }

}

// 2. create watcher saga: yhan ye watch krega ki jb jb action dispatch hua hai tb us action k according kya krna hai

export default function* watchCreateCall() {
  console.log("redux saga is running");
  yield takeEvery(STATUS, apiCall );
}

// 3. create rootsaga: yhan hum ek sath sare saga ko call krte hai