import * as AT from './action-types';

export const getCardList = () => ({
  type: AT.GET_CARD_LIST,
});

export const getCardListSuccess = ({ cardList }) => ({
  type: AT.GET_CARD_LIST_SUCCESS,
  payload: {
    cardList,
  },
});

export const getCardListFailed = ({ errorMessage }) => ({
  type: AT.GET_CARD_LIST_FAILED,
  payload: {
    errorMessage,
  },
});

export const createCard = ({ formValues }) => ({
  type: AT.CREATE_CARD,
  payload: {
    formValues,
  },
});

export const createCardSuccess = ({ card }) => ({
  type: AT.CREATE_CARD_SUCCESS,
  payload: {
    card,
  },
});

export const createCardFailed = ({ errorMessage }) => ({
  type: AT.CREATE_CARD_FAILED,
  payload: {
    errorMessage,
  },
});

export const updateCard = ({ formValues, cardId }) => ({
  type: AT.UPDATE_CARD,
  payload: {
    formValues,
    cardId,
  },
});

export const updateCardSuccess = ({ card }) => ({
  type: AT.UPDATE_CARD_SUCCESS,
  payload: {
    card,
  },
});

export const updateCardFailed = ({ errorMessage }) => ({
  type: AT.UPDATE_CARD_FAILED,
  payload: {
    errorMessage,
  },
});

export const deleteCard = ({ cardId }) => ({
  type: AT.DELETE_CARD,
  payload: {
    cardId,
  },
});

export const deleteCardSuccess = ({ cardId }) => ({
  type: AT.DELETE_CARD_SUCCESS,
  payload: {
    cardId,
  },
});

export const deleteCardFailed = ({ errorMessage }) => ({
  type: AT.DELETE_CARD_FAILED,
  payload: {
    errorMessage,
  },
});

