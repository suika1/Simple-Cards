import { setAuthToken } from 'api/localStorage';

import * as AT from './action-types';

const initialState = {
  isFetching: false,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.VALIDATE_BY_TOKEN:
      return {
        ...state,
        isFetching: true,
        currentUser: null,
      };
    case AT.VALIDATE_BY_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: action.payload.currentUser,
      };
    case AT.VALIDATE_BY_TOKEN_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case AT.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case AT.REMOVE_CURRENT_USER:
      setAuthToken('');
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}
