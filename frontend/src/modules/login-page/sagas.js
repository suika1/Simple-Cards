import { takeLatest, put, call } from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import * as localStorage from 'api/localStorage';

import * as AT from './action-types';
import * as appActions from 'modules/app/actions';
import * as actions from './actions';

function* loginUser({
  payload: {
    formValues,
  },
}) {
  try {
    const response = yield call(api.post, {
      url: urls.loginUser,
      body: {
        email: formValues.email,
        password: formValues.password,
      },
    });

    if (!response.ok || response.error) throw new Error(response.error);
    
    const currentUser = {
      id: response.results.id,
      email: response.results.email,
    };
    localStorage.setAuthToken(response.token);

    yield put(appActions.setCurrentUser({ currentUser }));
    yield put(actions.loginUserSuccess());
  } catch (err) {
    yield put(actions.loginUserFailed({ errorMessage: err.message }));
  }
}

function* createUser({
  payload: {
    formValues,
  },
}) {
  try {
    const response = yield call(api.post, {
      url: urls.users,
      body: {
        email: formValues.email,
        password: formValues.password,
      },
    });

    if (!response.ok || response.error) throw new Error(response.error);

    const currentUser = {
      id: response.results.id,
      email: response.results.email,
    };
    localStorage.setAuthToken(response.token);

    yield put(appActions.setCurrentUser({ currentUser }));
    yield put(actions.createUserSuccess());
  } catch (err) {
    yield put(actions.createUserFailed({ errorMessage: err.message }));
  }
}

function* watchLoginUser() {
  yield takeLatest(AT.LOGIN_USER, loginUser)
}

function* watchCreateUser() {
  yield takeLatest(AT.CREATE_USER, createUser)
}

const loginPageSagas = [
  watchLoginUser,
  watchCreateUser,
];

export default loginPageSagas;
