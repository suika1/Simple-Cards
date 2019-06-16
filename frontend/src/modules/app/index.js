
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import App from './component';

import * as actions from './actions';

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  app: state.app || {},
});

const mapDispatchToProps = {
  historyPush: push,
  validateByToken: actions.validateByToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
