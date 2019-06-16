import { put, call, takeLatest } from 'redux-saga/effects';

import * as AT from './action-types';
import * as actions from './actions';

import * as api from 'api';
import * as localStorage from 'api/localStorage';
import * as urls from 'api/urls';

function* validateByToken() {
  try {
    const {
      results,
      token,
      error,
      ok,
    } = yield call(api.post, {
      url: urls.validateUserByToken,
      headers: {
        'Authorization': localStorage.getAuthToken(),
      },
    });
    if (error || !ok) throw new Error(error);

    const currentUser = {
      id: results.id,
      email: results.email,
    };

    localStorage.setAuthToken(token);
    yield put(actions.validateByTokenSuccess({ currentUser }));
  } catch (err) {
    yield put(actions.validateByTokenFailed({ errorMessage: err.message }));
  }
}

function* watchValidateByToken() {
  yield takeLatest(AT.VALIDATE_BY_TOKEN, validateByToken);
}

const appSagas = [
  watchValidateByToken,
]

export default appSagas;
