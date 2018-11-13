import { fromJS } from 'immutable';

import { STATUS, API_FAIL, API_SUCCESS } from './constants';

// The initial state of the App
export const initialState = fromJS({
  statusValue: '',
  apiData : []
});

function todoReducer(state = initialState, action) {
  console.log("reducer action", action.type);
  console.log("reducer", action.data);
  switch (action.type) {
    case STATUS:
      console.log("reducer status");
      return state.set('statusValue', action.status);
    case API_SUCCESS:
      console.log("API_SUCCESS");
      return state.set(
        'apiData' , action.data
      )
    default:
      console.log("reducer default");
      return state;
  }
}

export default todoReducer;