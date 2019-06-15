import { createStore, applyMiddleware, compose } from 'redux';
import defaultReducer from './reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleWare();

export const history = createBrowserHistory();

export const store = createStore(
  defaultReducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    ),
  ),
);

rootSaga.forEach(saga => sagaMiddleware.run(saga));
