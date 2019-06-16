import * as AT from './action-types';

const initialState = {
  isFetching: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.CREATE_USER:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    case AT.CREATE_USER_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
    case AT.CREATE_USER_FAILED:
        return {
          ...state,
          isFetching: false,
          errorMessage: action.payload.errorMessage,
        };
    case AT.LOGIN_USER:
        return {
          ...state,
          isFetching: true,
          errorMessage: '',
        };
    case AT.LOGIN_USER_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
    case AT.LOGIN_USER_FAILED:
        return {
          ...state,
          isFetching: false,
          errorMessage: action.payload.errorMessage,
        };
    default:
      return state;
  }
}
