import { fromJS } from 'immutable';

import { STATUS } from './constants';

// The initial state of the App
export const initialState = fromJS({
  statusValue: '',
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS:
      return state.set('statusValue', true);
    default:
      return state;
  }
}

export default todoReducer;