import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import component from './component';
import * as actions from './actions';

const mapStateToProps = store => ({
  loginPage: store.loginPage || {},
});

const mapDispatchToProps = {
  createUser: actions.createUser,
  loginUser: actions.loginUser,
  historyPush: push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
