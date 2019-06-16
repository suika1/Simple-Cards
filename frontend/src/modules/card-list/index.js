import { connect } from 'react-redux';

import CardList from './component';

import * as actions from './actions';

import { removeCurrentUser } from 'modules/app/actions';

const mapStateToProps = store => ({
  currentUser: store.app.currentUser || {},
  cardList: store.cardList || {},
});

const mapDispatchToProps = {
  getCardList: actions.getCardList,
  createCard: actions.createCard,
  updateCard: actions.updateCard,
  deleteCard: actions.deleteCard,
  removeCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
