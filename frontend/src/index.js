import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { store, history } from './store';
import App from './modules/app';

import 'styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
