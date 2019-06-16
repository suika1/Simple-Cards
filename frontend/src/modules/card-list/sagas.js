import { takeLatest, put, call } from 'redux-saga/effects';

import * as AT from './action-types';
import * as actions from './actions';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage';

function* getCardList() {
  try {
    const response = yield call(api.get, {
      url: urls.cards,
      headers: {
        'Authorization': getAuthToken(),
      },
    });

    if (!response.ok || response.error) throw new Error(error);

    yield put(actions.getCardListSuccess({ cardList: response.results }));
  } catch (err) {
    yield put(actions.getCardListFailed({ errorMessage: err.message }));
  }
}

function* updateCard({
  payload: {
    formValues,
    cardId,
  },
}) {
  try {
    const card = {
      title: formValues.title,
      text: formValues.text,
    };

    const response = yield call(api.put, {
      url: `${urls.cards}${cardId}`,
      body: card,
      headers: {
        'Authorization': getAuthToken(),
      },
    });

    if (!response.ok || response.error) throw new Error(error);
    yield put(actions.updateCardSuccess({
      card: response.results,
    }));
  } catch (err) {
    yield put(actions.updateCardFailed({ errorMessage: err.message }));
  }
}

function* createCard({
  payload: {
    formValues,
  },
}) {
  try {
    const card = {
      title: formValues.title,
      text: formValues.text,
    };

    const response = yield call(api.post, {
      url: urls.cards,
      body: card,
      headers: {
        'Authorization': getAuthToken(),
      },
    });

    if (!response.ok || response.error) throw new Error(error);

    yield put(actions.createCardSuccess({
      card: response.results,
    }));
  } catch (err) {
    yield put(actions.createCardFailed({ errorMessage: err.message }));
  }
}

function* deleteCard({
  payload: {
    cardId,
  },
}) {
  try {
    const response = yield call(api.deleteReq, {
      url: `${urls.cards}${cardId}`,
      headers: {
        'Authorization': getAuthToken(),
      },
    });

    if (!response.ok || response.error) throw new Error(error);

    yield put(actions.deleteCardSuccess({ cardId }));
  } catch (err) {
    yield put(actions.deleteCardFailed({ errorMessage: err.message }));
  }
}

function* watchGetCardList() {
  yield takeLatest(AT.GET_CARD_LIST, getCardList);
}

function* watchUpdateCard() {
  yield takeLatest(AT.UPDATE_CARD, updateCard);
}

function* watchCreateCard() {
  yield takeLatest(AT.CREATE_CARD, createCard);
}

function* watchDeleteCard() {
  yield takeLatest(AT.DELETE_CARD, deleteCard);
}

const cardListSagas = [
  watchGetCardList,
  watchUpdateCard,
  watchCreateCard,
  watchDeleteCard,
];

export default cardListSagas;
