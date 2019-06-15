import loginPage from './modules/login-page/sagas';
import cardList from './modules/card-list/sagas';

export default  [
  ...loginPage,
  ...cardList,
];
