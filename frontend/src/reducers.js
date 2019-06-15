import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import loginPage from './modules/login-page/reducer';
import cardList from './modules/card-list/reducer';

export default history => combineReducers({
  loginPage,
  cardList,
  router: connectRouter(history),
});
