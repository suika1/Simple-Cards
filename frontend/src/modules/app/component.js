import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CardList from 'modules/card-list';
import LoginPage from 'modules/login-page';

import * as urls from 'appUrls';
import { getAuthToken } from 'api/localStorage';

export default class App extends React.Component {
  componentDidMount = () => {
    const {
      validateByToken,
      historyPush,
    } = this.props;

    // if token exists in localStorage - try to get current user
    if (getAuthToken()) {
      validateByToken();
    } else {
      // if no auth token - push to login page
      historyPush(urls.loginPage);
    }
  }

  componentDidUpdate = (prevProps) => {
    const {
      historyPush,
      app,
      pathname,
    } = this.props;
    
    // if user authed by token - redirect to card list page
    if (!app.isFetching
      && app.currentUser
      && prevProps.app.isFetching
      && !prevProps.app.currentUser
      && pathname !== urls.cardList
    ) {
      historyPush(urls.cardList);
    }

    // push to login page if not logined in 
    if ((
      !app.isFetching
      && !app.currentUser
      && prevProps.app.isFetching
      && pathname !== urls.loginPage
    ) || (
      prevProps.app.currentUser
      && !app.currentUser
    )) {
      historyPush(urls.loginPage);
    }
  }

  render() {
    const { app, pathname } = this.props;

    if (app.isFetching || (
      !app.currentUser
      && pathname !== urls.loginPage
    )) {
      return (
        <h3>Loading...</h3>
      );
    }

    return (
      <Switch>
        <Route
          path={urls.cardList}
          exact
          component={CardList}
        />

        <Route
          path={urls.loginPage}
          exact
          component={LoginPage}
        />

        <Route
          render={() => <h3>Page not found</h3>}
        />
      </Switch>
    )
  }
}
