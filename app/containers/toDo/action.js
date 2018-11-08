import { STATUS } from './constants';

/**
 * Changes the input field of the form
 *
 *  The new text of the input field
 *
 *   An action object with a type of CHANGE_USERNAME
 */
export function checkStatus(status) {
  return {
    type: STATUS,
  };
}