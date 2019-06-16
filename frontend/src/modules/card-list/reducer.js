import * as AT from './action-types';

const initialState = {
  isFetching: false,
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.GET_CARD_LIST:
      return {
        ...state,
        isFetching: true,
        items: [],
      };
    case AT.GET_CARD_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload.cardList,
      };
    case AT.GET_CARD_LIST_FAILED:
      return {
        ...state,
        isFetching: false,
      };

    case AT.CREATE_CARD:
        return {
          ...state,
          isFetching: true,
        };
      case AT.CREATE_CARD_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: state.items.concat(action.payload.card),
        };
      case AT.CREATE_CARD_FAILED:
        return {
          ...state,
          isFetching: false,
        };

    case AT.UPDATE_CARD:
      return {
        ...state,
        isFetching: true,
      };
    case AT.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.map(item => {
          const card = action.payload.card;
          if (item.id !== card.id) return item;
          return card;
        }),
      };
    case AT.UPDATE_CARD_FAILED:
      return {
        ...state,
        isFetching: false,
      };

    case AT.DELETE_CARD:
        return {
          ...state,
          isFetching: true,
        };
    case AT.DELETE_CARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.filter(item => item.id !== action.payload.cardId),
      };
    case AT.DELETE_CARD_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
