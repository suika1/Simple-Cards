import loginPage from 'modules/login-page/sagas';
import cardList from 'modules/card-list/sagas';
import app from 'modules/app/sagas';

export default  [
  ...loginPage,
  ...cardList,
  ...app,
];
