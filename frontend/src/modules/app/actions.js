import * as AT from './action-types';

export const validateByToken = () => ({
  type: AT.VALIDATE_BY_TOKEN,
});

export const validateByTokenSuccess = ({ currentUser }) => ({
  type: AT.VALIDATE_BY_TOKEN_SUCCESS,
  payload: {
    currentUser,
  },
});

export const validateByTokenFailed = ({ errorMessage }) => ({
  type: AT.VALIDATE_BY_TOKEN_FAILED,
  payload: {
    errorMessage,
  },
});

export const setCurrentUser = ({ currentUser }) => ({
  type: AT.SET_CURRENT_USER,
  payload: {
    currentUser,
  },
});

export const removeCurrentUser = () => ({
  type: AT.REMOVE_CURRENT_USER,
});
