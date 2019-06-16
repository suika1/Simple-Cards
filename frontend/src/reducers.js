import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import loginPage from 'modules/login-page/reducer';
import cardList from 'modules/card-list/reducer';
import app from 'modules/app/reducer';

export default history => combineReducers({
  app,
  loginPage,
  cardList,
  router: connectRouter(history),
});
