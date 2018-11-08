// import { call, put, select, takeLatest } from 'redux-saga/effects';

// // import request from 'utils/request';
// import {makeSelectToDo } from 'containers/toDo/selectors';

// /**
//  * Github repos request/response handler
//  */
// export function* getToDoData() {
//   // Select username from store
//   const value = yield select(makeSelectToDo());
//   const requestURL = `thttp://localhost:3000/toDo/${value}`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const toDo = yield call(request, requestURL);
//     yield put(reposLoaded(repos, username));
//   } catch (err) {
//     yield put(repoLoadingError(err));
//   }
// }

// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos);
// }