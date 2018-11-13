import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectToDo = state => state.get('todo', initialState);

const makeSelectToDo = () =>
  createSelector(selectToDo, todoState => todoState.get("apiData"));
// "statusValue"
export { selectToDo, makeSelectToDo  };