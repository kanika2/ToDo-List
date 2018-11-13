import { STATUS, API_SUCCESS, API_FAIL } from './constants';

/**
 * Changes the input field of the form
 *
 *  The new text of the input field
 *
 *   An action object with a type of CHANGE_USERNAME
 */
export function checkStatus(status) {
  console.log("action", status);
  return {
    type: STATUS,
    status : true,
  };
}

